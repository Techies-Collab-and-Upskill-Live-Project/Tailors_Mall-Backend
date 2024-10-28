import mongoose, { Model } from 'mongoose';
import { IPagination, IResponse } from '../../../constants';
import { hashPassword, IToken, queryConstructor, tokenHandler, trimObjectSpaces, verifyPassword } from '../../../utils';
import { sendMailNotification } from '../../../utils/email';
import { IUser, IUserResetPasswordPayload } from './general.interface';
import Repository from './general.repository';
import { userMessages } from './general.messages';
import Client from '../clients/client.model';
import Designer from '../designer/designer.model';

export default class AuthService {
  static async createUser<T extends Model<IUser>>(
    model: T,
    rawPayload: IUser
  ): Promise<IResponse> {
    const payload = trimObjectSpaces(rawPayload) as IUser;

    const validateUser = await Repository.validateUser(model, { email: payload.email });

    if (validateUser) {
      return { success: false, msg: userMessages.USER_EXISTS };
    }

    let { password } = payload;
    password = await hashPassword(password);
    const signIn = await Repository.createUser(model, { ...payload, password });
    console.log("userType", signIn?.userType)
    console.log("userType", signIn)

    const token = tokenHandler({ _id: signIn?._id, email: payload?.email, userType: signIn?.userType });

    const substitutional_parameters = {
      name: payload.fullName,
      email: payload.email,
      password: payload.password,
    };

    await sendMailNotification(
      payload.email,
      "Account Creation",
      substitutional_parameters,
      "REGISTRATION"
    );

    return { success: true, msg: userMessages.SIGN_UP_SUCCESS, data: {...token} };
  }

  static async login<T extends Model<IUser>>(
    model: T,
    payload: Pick<IUser, "email" | "password">
  ): Promise<IResponse> {
    const { email, password } = payload;
    const user = await Repository.fetchUserWithPassword(model, { email });

    if (!user) return { success: false, msg: userMessages.LOGIN_ERROR };
    if(user.isDeleted) return { success: false, msg: userMessages.USER_NOT_FOUND }

    const { _id, password: hashedPassword } = user;

    const passwordCheck = await verifyPassword(password, hashedPassword);

    if (!passwordCheck) return { success: false, msg: userMessages.LOGIN_ERROR };
    console.log("user", user)

    console.log("here")
    const token = tokenHandler({ _id, email, userType: user?.userType });

    return {
      success: true,
      msg: userMessages.FETCH_USERS,
      data: {
        ...token,
      },
    };
  }

  static async resetPassword<T extends Model<IUser>>(
    model: T,
    userPayload: IUserResetPasswordPayload
  ): Promise<IResponse> {
    const { email, newPassword, confirmPassword } = userPayload;

    const user = await Repository.fetchUserWithPassword(model, { email });

    if (!user) {
      return { success: false, msg: userMessages.USER_NOT_FOUND };
    }

    if (newPassword !== confirmPassword) return { success: false, msg: userMessages.PASSWORD_MISMATCH };

    const updatePassword = await Repository.updateUserDetails(
      model,
      { email },
      { password: await hashPassword(newPassword) }
    );

    if (!updatePassword)
      return { success: false, msg: userMessages.PASSWORD_RESET_FAILURE };

    return { success: true, msg: userMessages.PASSWORD_RESET_SUCCESS };
  }

  static async updatePassword<T extends Model<IUser>>(
    model: T,
    userPayload: IUserResetPasswordPayload,
    user: IToken
  ): Promise<IResponse> {
    const { currentPassword, newPassword, confirmPassword } = userPayload;
    const { _id, email } = user;

    const userData = await Repository.fetchUserWithPassword(model, { _id });

    if (!userData) {
      return { success: false, msg: userMessages.USER_NOT_FOUND };
    }

    if (!(await verifyPassword(currentPassword, userData.password))) {
      return { success: false, msg: userMessages.INCORRECT_PASSWORD };
    }

    if (newPassword !== confirmPassword) return { success: false, msg: userMessages.PASSWORD_MISMATCH };

    const updatePassword = await Repository.updateUserDetails(
      model,
      { email },
      { password: await hashPassword(newPassword) }
    );

    if (!updatePassword)
      return { success: false, msg: userMessages.PASSWORD_RESET_FAILURE };

    return { success: true, msg: userMessages.PASSWORD_RESET_SUCCESS };
  }

  // User Main Service
  static async updateUserDetails<T extends Model<IUser>>(
    model: T,
    userPayload: Partial<IUser>,
    update: Partial<IUser>,
  ): Promise<{ updatedExisting?: boolean | undefined }> {
    return Repository.updateUserDetails(model, userPayload, update)
  }

  static async updateUserProfile<T extends Model<IUser>>(
    model: T,
    user: IToken,
    userPayload: Partial<IUser>,
  ): Promise<IResponse> {
    const { _id } = user

    const update = await Repository.updateUserDetails(
      model,
      {
        _id: new mongoose.Types.ObjectId(_id),
      },
      { ...userPayload },
    )

    if (!update)
      return {
        success: false,
        msg: userMessages.UPDATE_PROFILE_FAILURE,
      }

    return { success: true, msg: userMessages.UPDATE_PROFILE_SUCCESS }
  }

  static async getUserDetails<T extends Model<IUser>>(
    model: T,
    userPayload: Partial<IUser & IPagination>,
  ): Promise<IResponse | null> {
    const { _id, email } = userPayload

    const user = await Repository.fetchUsersByParams(
      model,
      { _id, email, isDeleted: false },
      { sort: "asc", limit: 0, skip: 0 },
    )

    if (!user || user.length < 1) return { success: false, msg: userMessages.NOT_FOUND }

    return { success: true, msg: userMessages.FETCH, data: user }
  }

  static async deleteUserProfile<T extends Model<IUser>>(
    model: T,
    user: IToken
  ): Promise<IResponse> {
    const { _id } = user

    const userDetails = await Repository.updateUserDetails(
      model,
      { _id: new mongoose.Types.ObjectId(_id) },
      {
        $set: { isDeleted: true },
      },
    )

    return { success: true, msg: userMessages.DELETE }
  }

  static async fetchUsersService<T extends Model<IUser>>(
    model: T,
    query: Partial<IUser>
  ): Promise<IResponse> {
    const { error, params } = queryConstructor(
      query,
      "createdAt",
      "Users",
    )

    if (error) return { success: false, msg: error }

    const users = await Repository.fetchUsersByParams(
      model,
      {...params},
      { sort: "asc", limit: 0, skip: 0 }
    )

    if (users.length < 1)
      return {
        success: false,
        msg: userMessages.NOT_FOUND,
        data: [],
      }

    return {
      success: true,
      msg: userMessages.FETCH_USERS,
      data: users,
    }
  }

  static async searchService<T extends Model<IUser>>(
    model: T,
    query: Partial<IUser>
  ): Promise<IResponse> {
    const { error, params, limit, skip, sort } = queryConstructor(
      query,
      "createdAt",
      "Users",
    )

    if (error) return { success: false, msg: error }

    const users = await Repository.search(model, {
      ...params,
      limit,
      skip,
      sort,
    })

    if (users.length < 1)
      return {
        success: false,
        msg: userMessages.NOT_FOUND,
        data: [],
      }

    return {
      success: true,
      msg: userMessages.FETCH_USERS,
      data: users,
    }
  }

  static async searchCollections(query: any) {
    const { error, params, limit, skip, sort } = queryConstructor(query, "_id", "Users");
  
    // If there's an error from queryConstructor, return the error
    if (error) return { success: false, msg: error };
  
    // Check if searchTerm exists in the query
    const searchTerm = query.search || '';
  
    try {
      const searchQuery = {
        index: "default", // Replace with your actual search index name
        compound: {
          should: [
            {
              text: {
                query: searchTerm, // Use query object for searchTerm
                path: ["fullName", "email"], // Ensure field name matches your schema
                fuzzy: { maxEdits: 1 }, // Enable fuzzy search
              },
            },
          ],
        },
      };
  
      // const paginationQuery = [
      //   { $match: params }, // Use params from queryConstructor for filters
      //   { $limit: Number(limit) },
      //   { $skip: Number(skip) },
      //   {
      //     $sort: sort, // Use sort from queryConstructor
      //   },
      // ];
  
      const clientResults = await Client.aggregate([
        {
          $search: searchQuery,
        },
      ]).limit(limit).skip(skip).sort(sort);
  
      const designerResults = await Designer.aggregate([
        {
          $search: searchQuery,
        },
      ]).limit(limit).skip(skip).sort(sort);
  
      const results = [
        ...clientResults, ...designerResults
      ]
      
      return {
        success: true,
        msg: userMessages.FETCH_USERS,
        data: results,
      };
    } catch (error) {
      console.log("error", error);
      return {
        success: false,
        msg: userMessages.NOT_FOUND,
        data: { error: "Failed to execute search query" },
      };
    }
  }
}
