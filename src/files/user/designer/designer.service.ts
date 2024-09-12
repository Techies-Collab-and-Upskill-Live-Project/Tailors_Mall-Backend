import { IPagination, IResponse } from "../../../constants";
import { IToken } from "../../../utils";
import { IUserResetPasswordPayload } from "../general/general.interface";
import AuthService from "../general/general.service";
import { IDesigner, IPortfolioItem } from "./designer.interface";
import Designer from "./designer.model";

export default class DesignerService {
  static async createDesigner(designerPayload: IDesigner): Promise<IResponse> {
    return await AuthService.createUser(Designer, designerPayload);
  }

  static async DesignerLogin(
    designerPayload: Pick<IDesigner, "email" | "password">
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
    return await AuthService.updateUserDetails(Designer, designerPayload, update);
  }

  static async updateDesignerProfile(
    user: IToken,
    designerPayload: Partial<IDesigner>,
  ): Promise<IResponse> {
    return await AuthService.updateUserProfile(Designer, user, designerPayload);
  }

  static async getDesignerDetails(
    designerPayload: Partial<IDesigner & IPagination>,
  ): Promise<IResponse | null> {
    return await AuthService.getUserDetails(Designer, designerPayload);
  }

  static async deleteDesignerProfile(
    user: IToken
  ): Promise<IResponse> {
    return await AuthService.deleteUserProfile(Designer, user);
  }

  static async fetchDesignersService(
    query: Partial<IDesigner>
  ): Promise<IResponse> {
    return await AuthService.fetchUsersService(Designer, query);
  }

  static async searchService(
    query: Partial<IDesigner>
  ): Promise<IResponse> {
    return await AuthService.searchService(Designer, query);
  }

  // New methods for managing portfolios

  static async addPortfolioItem(
    user: IToken,
    portfolioItem: IPortfolioItem
  ): Promise<IResponse> {
    try {
      const designer = await Designer.findById(user.id);
      if (!designer) {
        throw new Error("Designer not found");
      }

      designer.portfolio.push(portfolioItem);
      await designer.save();
      
      return { success: true, message: "Portfolio item added successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async updatePortfolioItem(
    user: IToken,
    portfolioItemId: string,
    updatedItem: Partial<IPortfolioItem>
  ): Promise<IResponse> {
    try {
      const designer = await Designer.findById(user.id);
      if (!designer) {
        throw new Error("Designer not found");
      }

      const itemIndex = designer.portfolio.findIndex(item => item._id.toString() === portfolioItemId);
      if (itemIndex === -1) {
        throw new Error("Portfolio item not found");
      }

      designer.portfolio[itemIndex] = { ...designer.portfolio[itemIndex].toObject(), ...updatedItem };
      await designer.save();
      
      return { success: true, message: "Portfolio item updated successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async deletePortfolioItem(
    user: IToken,
    portfolioItemId: string
  ): Promise<IResponse> {
    try {
      const designer = await Designer.findById(user.id);
      if (!designer) {
        throw new Error("Designer not found");
      }

      const itemIndex = designer.portfolio.findIndex(item => item._id.toString() === portfolioItemId);
      if (itemIndex === -1) {
        throw new Error("Portfolio item not found");
      }

      designer.portfolio.splice(itemIndex, 1);
      await designer.save();
      
      return { success: true, message: "Portfolio item deleted successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  static async getPortfolioItems(
    user: IToken
  ): Promise<IResponse> {
    try {
      const designer = await Designer.findById(user.id);
      if (!designer) {
        throw new Error("Designer not found");
      }
      
      return { success: true, data: designer.portfolio };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

