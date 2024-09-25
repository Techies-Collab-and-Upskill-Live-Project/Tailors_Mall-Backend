export interface INotification {
  _id?: any
  userId?: any
  title: string
  message: string
  recipient?: "Client" | "Designer"
  recipientId: any
  status?: "new" | "read"
  // userType: "Partner" | "Company"
  createdAt?: Date
  updatedAt?: Date
}
