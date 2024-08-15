import pagination, { IPagination } from "../../../constants";
import { IUser, IUserLogin, IUserSearch } from "./general.interface"
import mongoose, { Model } from "mongoose"

const { LIMIT, SKIP, SORT } = pagination

export default class Repository {
  static createUser<T extends Model<IUser>>(
    model: T, 
    userPayload: IUser
  ): Promise<IUser> {
    return model.create(userPayload);
  }

  static async fetchUser<T extends Model<IUser>>(
    model: T,
    userPayload: Partial<IUser>,
    select: Partial<Record<keyof IUser, number | boolean | object>> = {
      _id: 1,
      email: 1,
    },
  ): Promise<Partial<IUser> | null> {
    const user: Awaited<IUser | null> = await model.findOne(
      {
        ...userPayload,
      },
      select,
    ).lean();
    return user;
  }

  static async fetchUserWithPassword<T extends Model<IUser>>(
    model: T,
    userPayload: Partial<IUser>,
  ): Promise<IUserLogin | null> {
    const user: Awaited<IUser | null> = await model.findOne(
      {
        ...userPayload,
      },
      { _id: 1, password: 1, email: 1, isDeleted: 1 }
    );
    return user;
  }

  static async validateUser<T extends Model<IUser>>(
    model: T,
    query: Partial<IUser> | { $or: Partial<IUser>[] }
  ) {
    return model.exists(query);
  }

  static async updateUserDetails<T extends Model<IUser>>(
    model: T,
    userPayload: Partial<IUser>,
    update:
      | Partial<IUser>
      | { $push?: Record<any, any>; $set?: Record<any, any> }
      | { $set: Partial<IUser> },
  ): Promise<{ updatedExisting?: boolean | undefined }> {
    const { lastErrorObject: response } = await model.findOneAndUpdate(
      {
        ...userPayload,
      },
      { ...update },
      { rawResult: true }, //returns details about the update
    );

    return response!;
  }

  static async fetchUsersByParams<T extends Model<IUser>>(
    model: T,
    userPayload: Partial<IUser>,
    pagination: IPagination
  ) {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
    } = pagination;
    const user: Awaited<IUser[] | null> = await model.find({
      ...userPayload,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select("-password");
    return user;
  }

  static async userCountByParams<T extends Model<IUser>>(
    model: T,
    query: Partial<IUser> | Record<string, any>,
  ): Promise<number> {
    const userCount = await model.countDocuments().where({ ...query });

    return userCount;
  }

  static async search<T extends Model<IUser>>(
    model: T,
    query: IUserSearch
  ): Promise<IUser[]> {
    const applicants = await model.find({
      $or: [
        { fullName: { $regex: query.search, $options: "i" } },
        { phoneNumber: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ],
    });
    return applicants;
  }
}
