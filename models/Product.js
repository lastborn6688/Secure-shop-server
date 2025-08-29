

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  des: { type: String, required: true },
  price: { type: Number, required: true },
  src: { type: String, required: true }, // image URL / base64 / cloud link
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
