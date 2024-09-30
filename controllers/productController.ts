import { Request, Response } from "express";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { IProduct } from "../models/productModel";
import { uploadImageToCloudinary } from "../utils/imageUpload";
import { SortOrder } from "mongoose";

enum StockFilter {
  All = "all",
  NoStock = "nostock",
  InStock = "instock",
}

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { stock, min, max, sortBy } = req.query;
    const filter: any = {};
    if (stock) {
      if (stock === StockFilter.InStock) {
        filter.stock = { $gt: 0 };
      } else if (stock === StockFilter.NoStock) {
        filter.stock = 0;
      }
    }
    if (min || max) {
      filter.price = {};
      if (min) {
        filter.price.$gte = Number(min);
      }
      if (max) {
        filter.price.$lte = Number(max);
      }
    }
    let sortOptions: { [key: string]: SortOrder } = {};

    if (sortBy) {
      const sortFields = (sortBy as string).split(":");
      sortOptions[sortFields[0]] = sortFields[1] === "desc" ? -1 : 1;
    }

    const products = await getAllProducts(filter, sortOptions);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, stock } = req.body;
    const imageFile = req.file;

    let featuredImage = "";
    if (imageFile) {
      featuredImage = await uploadImageToCloudinary(imageFile);
    }

    const newProduct = {
      name,
      description,
      price,
      stock,
      featuredImage,
    } as IProduct;

    const product = await createProduct(newProduct);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product", error });
  }
};

export const updateProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, stock } = req.body;
    let featuredImage = req.body.featuredImage;

    const imageFile = req.file;

    if (imageFile) {
      featuredImage = await uploadImageToCloudinary(imageFile);
    }

    const newProduct = {
      name,
      description,
      price,
      stock,
      featuredImage,
    } as IProduct;

    const updatedProduct = await updateProduct(req.params.id, newProduct);
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update product", error });
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};
