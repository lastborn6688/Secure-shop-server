import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, des, price, src } = req.body;

    if (!name || !des || !price || !src) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({ name, des, price, src });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}