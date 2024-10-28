export interface IUser extends Partial<IUserExt> {
  _id?: any
  email: string
  password: string
  fullName: string
  bio?: string
  website?: string
  userType?: string
  phoneNumber: string
  isDeleted: boolean
  createdAt?: Date
  updatedAt?: Date
}

interface IUserExt {
  // registrationNumber: string
  businessName?: string
  location?: string
  image?: string
  accountDetails: accountDetails
}

export interface IUserLogin 
  extends Pick<IUser, "_id" | "email" | "password" | "isDeleted" | "userType"> {}

export interface IUserResetPasswordPayload {
  email: string
  newPassword: string
  currentPassword: string
  confirmPassword: string
}

interface accountDetails {
  bankName: string
  accountName: string
  accountNumber: string
}

export interface IUserSearch {
  search: string
  status?: string
  startDate: Date
  endDate: Date
}
