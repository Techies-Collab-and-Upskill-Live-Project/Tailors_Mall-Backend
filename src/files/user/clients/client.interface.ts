import { IUser } from "../general/general.interface"

export interface IClient extends IUser {
  _id?: any
  email: string
  phoneNumber: string
  password: string
  info?:string
  country?: string
  service?: "fulltime" | "oneoff"
  experienceRequirement?: "begginer" | "intermediate" | "expert"
  workChoice?: "local" | "remote" | "neutral"

  googleId?: string
  facebookId?: String
  fullName: string
  image?:string
  role?: string
  userType?: string 
  isDeleted: boolean
  createdAt?: Date
  updatedAt?: Date
}
