import { FilterQuery, SortOrder } from "mongoose";
import Product, { IProduct } from "../models/productModel";

export const getAllProducts = async (
  filter: FilterQuery<IProduct>,
  sortOptions: { [key: string]: SortOrder }
): Promise<IProduct[]> => {
  return await Product.find(filter).sort(sortOptions);
};

export const createProduct = async (
  productData: IProduct
): Promise<IProduct> => {
  const product = new Product(productData);
  return await product.save();
};

export const updateProduct = async (
  id: string,
  productData: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id);
};
