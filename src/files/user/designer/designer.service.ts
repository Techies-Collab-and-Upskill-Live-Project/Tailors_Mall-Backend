import { IPagination, IResponse } from "../../../constants";
import { IToken } from "../../../utils";
import { IUserResetPasswordPayload } from "../general/general.interface";
import AuthService from "../general/general.service";
import { IDesigner } from "./designer.interface";
import Designer from "./designer.model";

export default class DesignerService {
  static async createDesigner(designerPayload: IDesigner): Promise<IResponse> {
    return await AuthService.createUser(Designer, designerPayload)
  }

  static async DesignerLogin(
    designerPayload: Pick<IDesigner, "email" | "password" >
  ): Promise<IResponse> {
    return await AuthService.login(Designer, designerPayload);
  }

  static async resetPassword(
    designerPayload: IUserResetPasswordPayload
  ): Promise<IResponse> {
    return await AuthService.resetPassword(Designer, designerPayload);
  }

  static async updatePassword(
    designerPayload: IUserResetPasswordPayload, 
    user: IToken
  ): Promise<IResponse> {
    return await AuthService.updatePassword(Designer, designerPayload, user);
  }

  static async updateDesignerDetails(
    designerPayload: Partial<IDesigner>,
    update: Partial<IDesigner>,
  ): Promise<{ updatedExisting?: boolean | undefined }> {
    return await AuthService.updateUserDetails(Designer, designerPayload, update)
  }

  static async updateDesignerProfile(
    user: IToken,
    designerPayload: Partial<IDesigner>,
  ):Promise<IResponse> {
    return await AuthService.updateUserProfile(Designer, user, designerPayload)
  }

  static async getDesignerDetails(
    designerPayload: Partial<IDesigner & IPagination>,
  ): Promise<IResponse | null> {
    return await AuthService.getUserDetails(Designer, designerPayload)
  }

  static async deleteDesignerProfile(
    user: IToken
  ): Promise<IResponse> {
    return await AuthService.deleteUserProfile(Designer, user)
  }

  static async fetchDesignersService(
    query: Partial<IDesigner>
  ) {
    return await AuthService.fetchUsersService(Designer, query)
  }

  static async searchService(
    query: Partial<IDesigner>
  ) {
    return await AuthService.searchService(Designer, query)
  }
}