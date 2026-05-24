import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  uploadImage,
} from "../controllers/productController.js";
import upload from "../config/cloudinary.js";

const router = express.Router();

// Create and fetch
router.post("/upload", upload.single("image"), uploadImage);
router.post("/", addProduct);
router.get("/", getProducts);

// Delete and update
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;