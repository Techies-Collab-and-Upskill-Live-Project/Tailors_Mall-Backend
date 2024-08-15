import { IPagination, IResponse } from "../../../constants";
import { IToken } from "../../../utils";
import AuthService from "../general/general.service";
import Client from "./client.model";
import { IClient } from "./client.interface";
import AuthRouter from "../../auth/auth.route";
import { IUserResetPasswordPayload } from "../general/general.interface";

export default class ClientService {
  static async createClient(clientPayload: IClient): Promise<IResponse> {
    return await AuthService.createUser(Client, clientPayload);
  }

  static async clientLogin(
    clientPayload: Pick<IClient, "email" | "password" >
  ): Promise<IResponse> {
    return await AuthService.login(Client, clientPayload);
  }

  static async resetPassword(
    clientPayload: IUserResetPasswordPayload
  ): Promise<IResponse> {
    return await AuthService.resetPassword(Client, clientPayload);
  }

  static async updatePassword(
    clientPayload: IUserResetPasswordPayload, 
    user: IToken
  ): Promise<IResponse> {
    return await AuthService.updatePassword(Client, clientPayload, user);
  }

  static async updateClientDetails(
    clientPayload: Partial<IClient>,
    update: Partial<IClient>,
  ): Promise<{ updatedExisting?: boolean | undefined }> {
    return await AuthService.updateUserDetails(Client, clientPayload, update)
  }

  static async updateClientProfile(
    user: IToken,
    clientPayload: Partial<IClient>,
  ):Promise<IResponse> {
    return await AuthService.updateUserProfile(Client, user, clientPayload)
  }

  static async getClientDetails(
    clientPayload: Partial<IClient & IPagination>,
  ): Promise<IResponse | null> {
    return await AuthService.getUserDetails(Client, clientPayload)
  }

  static async deleteClientProfile(
    user: IToken
  ): Promise<IResponse> {
    return await AuthService.deleteUserProfile(Client, user)
  }

  static async fetchClientsService(
    query: Partial<IClient>
  ) {
    return await AuthService.fetchUsersService(Client, query)
  }

  static async searchService(
    query: Partial<IClient>
  ) {
    return await AuthService.searchService(Client, query)
  }
}