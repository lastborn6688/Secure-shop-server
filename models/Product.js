import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    des: { type: String, required: true },
    price: { type: Number, required: true },
    src: { type: String, required: true }, // image URL / base64 / cloud link
    category: {
      type: String,
      required: true,
      enum: [
        "headset",
        "carcharger",
        "bags",
        "bavin",
        "baeutifiers",
        "cables",
        "chargers",
        "earbuds",
        "joyroom",
        "ldnio",
        "oraimo",
        "powerbank",
        "powerstation",
        "remax",
        "stands",
        "usams",
        "wakome",
        "wiwu",
      ], // restrict to specific categories
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
