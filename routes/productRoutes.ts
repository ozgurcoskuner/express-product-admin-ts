import { Router } from "express";
import {
  getProducts,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/productController";
import upload from "../middlewares/multer";

const router = Router();

router.route("/").get(getProducts).post(upload.single("image"), addProduct);

router
  .route("/:id")
  .put(upload.single("image"), updateProductById)
  .delete(deleteProductById);

export default router;
