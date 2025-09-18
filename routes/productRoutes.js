import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create and fetch
router.post("/", addProduct);
router.get("/", getProducts);

// Delete and update
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;