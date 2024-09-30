import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  featuredImage: string;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be at least 0"],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock must be at least 0"],
  },
  featuredImage: {
    type: String,
    required: true,
  },
});

const ProductModel = model("Products", schema);
export default ProductModel;
