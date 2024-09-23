import mongoose from "mongoose"
import { IResponse } from "../../constants";
import { queryConstructor } from "../../utils";
import { ICategory } from "./category.interface";
import { categoryMessage } from "./category.messages";
import CategoryRepository from "./category.repository";

export class CategoryService {
  static async createCategory(categoryPayload: ICategory): Promise<IResponse> {
    const category = await CategoryRepository.createCategory({
      ...categoryPayload,
    })

    if (!category)
      return { success: false, msg: categoryMessage.REQUEST_FAILURE }

    return {
      success: true,
      msg: categoryMessage.REQUEST_SUCCESS,
      data: category,
    }
  }

  static async fetchCategoryService(categoryPayload: Partial<ICategory>) {
    const { error, params, limit, skip, sort } = queryConstructor(
      categoryPayload,
      "createdAt",
      "Category",
    )

    if (error) return { success: false, msg: error }

    const category = await CategoryRepository.fetchCategoryByParams({
      ...params,
      limit,
      skip,
      sort,
    })

    if (category.length < 1)
      return { success: false, msg: categoryMessage.FETCH_ERROR, data: [] }

    return {
      success: true,
      msg: categoryMessage.FETCH_SUCCESS,
      data: category,
    }
  }

  static async updateCategory(
    categoryPayload: Partial<ICategory>,
    categoryId: any,
  ) {
    const category = await CategoryRepository.updateCategoryDetails(
      { _id: new mongoose.Types.ObjectId(categoryId) },
      { $set: { ...categoryPayload } },
    )

    if (!category) return { success: false, msg: categoryMessage.UPDATE_ERROR }

    return {
      success: true,
      msg: categoryMessage.UPDATE_SUCCESS,
      category,
    }
  }

  static async deleteCategory(categoryPayload: any) {
    const category = await CategoryRepository.updateCategoryDetails(
      { _id: new mongoose.Types.ObjectId(categoryPayload) },
      { isDelete: true },
    )
    if (!category) return { success: false, msg: categoryMessage.DELETE_ERROR }

    return {
      success: true,
      msg: categoryMessage.DELETE,
    }
  }
}