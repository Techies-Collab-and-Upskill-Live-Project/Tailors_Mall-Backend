// export enum UserRole {
//   Tailor = 'TAILOR',
//   User = 'USER',
// }

export interface IUser extends Partial<IUserExt> {
  _id?: any
  email: string
  password: string
  fullName: string
  // role: UserRole
  bio?: string
  website?: string
  phoneNumber: string
  category: "user" | "designer"
  isDeleted: boolean
  createdAt?: Date
  updatedAt?: Date
}

interface IUserExt {
  registrationNumber: string
  businessName: string
  location: string
  image: string
  accountDetails: accountDetails
}

export interface IUserLogin 
  extends Pick<IUser, "_id" | "email" | "password"> {}

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
