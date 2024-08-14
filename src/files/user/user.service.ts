import mongoose from "mongoose"
import { IPagination, IResponse } from "../../constants"
import { generalMessages } from "../../core/messages"
import { AlphaNumeric, hashPassword, IToken, queryConstructor, tokenHandler, verifyPassword } from "../../utils"
import { IUser, IUserResetPasswordPayload } from "./user.interface"
import { userMessages } from "./user.messages"
import UserRepository from "./user.repository"
import { sendMailNotification } from "../../utils/email"
import { RequestHandler } from "../../utils/axios.provision"
import { authMessages } from "../auth/auth.messages"

const url = process.env.BASE_URL || "https://dsep.skillupafrica.com.ng"

export default class UserService {
  // User Authentication Service
  static async signup(userPayload: IUser): Promise<IResponse> {
    userPayload.email = userPayload.email.toLowerCase()
    const { email, phoneNumber, fullName } = userPayload

    const validateUser = await UserRepository.validateUser({
      $or: [{ email }, { phoneNumber }],
    })

    if (validateUser) return { success: false, msg: userMessages.USER_EXISTS }

    const signUp = await UserRepository.createUser({
      ...userPayload,
      password: await hashPassword(userPayload.password),
    })

    if (!signUp)
      return { success: false, msg: generalMessages.UNEXPECTED_FAILURE }

    const token = tokenHandler({ _id: signUp._id, email, isAdmin: false, userType: "user"  })

    //send mail to user including their unique sign up link
    const substitutional_parameters = {
      name: userPayload.fullName,
      email: userPayload.email,
      password: userPayload.password
    }

    await sendMailNotification(
      email,
      "Registration",
      substitutional_parameters,
      "REGISTRATION",
    )

    return {
      success: true,
      msg: userMessages.SIGN_UP_SUCCESS,
      data: { userId: signUp._id, ...token },
    }
  }

  static async userLogin(
    payload: Pick<IUser, "email" | "password" >
  ): Promise<IResponse> {
    const { email, password, } = payload
    const user = await UserRepository.fetchUserWithPassword({ email })

    if (!user) return { success: false, msg: authMessages.LOGIN_ERROR }

    const {
      _id,
      password: hashedPassword,
    } = user

    const passwordCheck = await verifyPassword(password, hashedPassword)

    if (!passwordCheck) return { success: false, msg: authMessages.LOGIN_ERROR }

    const token = tokenHandler({ _id, email, isAdmin: false, userType: "user"  })

    return {
      success: true,
      msg: userMessages.LOG_IN_SUCCESS,
      data: {
        ...token,
      },
    }
  }

  static async resetPassword(userPayload: IUserResetPasswordPayload) : Promise<IResponse> {
    const { email, newPassword, confirmPassword } = userPayload

    const user = await UserRepository.fetchUserWithPassword({ email })

    if (!user) {
      return { success: false, msg: authMessages.USER_NOT_FOUND };
    }

    if(newPassword !== confirmPassword) return { success: false, msg: authMessages.PASSWORD_MISMATCH }

    const updatePassword = await UserRepository.updateUserDetails(
      { email },
      { password: await hashPassword(newPassword) }
    )

    if (!updatePassword)
      return { success: false, msg: authMessages.PASSWORD_RESET_FAILURE }

    return { success: true, msg: authMessages.PASSWORD_RESET_SUCCESS }
  
  }

  static async updatePassword(userPayload: IUserResetPasswordPayload, user: IToken) : Promise<IResponse> {
      const { currentPassword, newPassword, confirmPassword } = userPayload
      const { _id, email } = user

      const designer = await UserRepository.fetchUserWithPassword({ _id })

      if (!designer) {
        return { success: false, msg: authMessages.USER_NOT_FOUND };
      }

      if (!(await verifyPassword(currentPassword, designer.password))) {
        return { success: false, msg: authMessages.INCORRECT_PASSWORD}
      }

      if(newPassword !== confirmPassword) return { success: false, msg: authMessages.PASSWORD_MISMATCH }

      const updatePassword = await UserRepository.updateUserDetails(
        { email },
        { password: await hashPassword(newPassword) }
      )

      if (!updatePassword)
        return { success: false, msg: authMessages.PASSWORD_RESET_FAILURE }

      return { success: true, msg: authMessages.PASSWORD_RESET_SUCCESS }
  }




  // User Main Service
  static async updateUserDetails(
    userPayload: Partial<IUser>,
    update: Partial<IUser>,
  ): Promise<{ updatedExisting?: boolean | undefined }> {
    return UserRepository.updateUserDetails(userPayload, update)
  }

  static async updateUserProfile(
    user: IToken,
    userPayload: Partial<IUser>,
  ): Promise<IResponse> {
    const { _id } = user

    const update = await UserRepository.updateUserDetails(
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

  static async getUserDetails(
    userPayload: Partial<IUser & IPagination>,
  ): Promise<IResponse | null> {
    const { _id, email } = userPayload

    const user = await UserRepository.fetchUsersByParams(
      { _id, email, isDeleted: false },
      { sort: "asc", limit: 0, skip: 0 },
    )

    if (!user || user.length < 1) return { success: false, msg: userMessages.NOT_FOUND }

    return { success: true, msg: userMessages.FETCH, data: user }
  }

  static async deleteUserProfile(user: IToken): Promise<IResponse> {
    const { _id } = user

    const userDetails = await UserRepository.updateUserDetails(
      { _id: new mongoose.Types.ObjectId(_id) },
      {
        $set: { isDeleted: true },
      },
    )

    return { success: true, msg: userMessages.DELETE }
  }

  static async fetchUsersService(query: Partial<IUser>) {
    const { error, params } = queryConstructor(
      query,
      "createdAt",
      "Users",
    )

    if (error) return { success: false, msg: error }

    const users = await UserRepository.fetchUsersByParams(
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

  static async searchService(query: Partial<IUser>) {
    const { error, params, limit, skip, sort } = queryConstructor(
      query,
      "createdAt",
      "Users",
    )

    if (error) return { success: false, msg: error }

    const users = await UserRepository.search({
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
}
