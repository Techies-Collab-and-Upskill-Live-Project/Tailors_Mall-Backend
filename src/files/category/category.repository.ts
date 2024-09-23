import pagination, { IPagination } from "../../constants"
import { ICategory } from "./category.interface"
import Category from "./category.model"

const { LIMIT, SKIP, SORT } = pagination

export default class CategoryRepository {
  static async createCategory(categoryPayload: ICategory): Promise<ICategory> {
    return Category.create(categoryPayload)
  }

  static async fetchCategory(
    categoryPayload: Partial<ICategory> | Record<any, any>,
    select: Partial<Record<keyof ICategory, number | Boolean | object>>,
  ): Promise<Partial<ICategory> | null> {
    const category: Awaited<ICategory | null> = await Category.findOne(
      {
        ...categoryPayload,
      },
      select,
    )

    return category
  }

  static async fetchCategoryByParams(
    categoryPayload: Partial<ICategory & IPagination>,
  ) {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
      ...restOfPayload
    } = categoryPayload

    const category: Awaited<ICategory[] | null> = await Category.find({
      ...restOfPayload,
      isDelete: false,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit)

    return category
  }

  static async updateCategoryDetails(
    categoryPayload: Partial<ICategory>,
    update:
      | Partial<ICategory>
      | { $push?: Record<any, any>; $set?: Record<any, any> }
      | { $set: Partial<ICategory> },
      arrayFilters?: any[] | undefined
  ) {
    const updateCategory = await Category.findOneAndUpdate(
      {
        ...categoryPayload,
      },
      { ...update },
      { new: true, runValidators: true, arrayFilters }, //returns details about the update
    )

    return updateCategory
  }
}
