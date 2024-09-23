import mongoose, { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const CategorySchema = new Schema<ICategory>(
  {
    name: { 
      type: String, 
    },
    description: { 
      type: String, 
    },
    isDelete: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true },
);

const category = model<ICategory>("Category", CategorySchema, "category");
export default category;