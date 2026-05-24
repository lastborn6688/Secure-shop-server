import Product from "../models/Product.js";

// Upload Image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }
    // multer-storage-cloudinary attaches the secure Cloudinary URL to req.file.path
    res.status(200).json({ imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ message: "Image upload failed: " + error.message });
  }
};

// Add product
export const addProduct = async (req, res) => {
  try {
    const { name, des, price, src, category } = req.body;

    if (!name || !des || !price || !src || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const allowedCategories = [
      "headset",
      "carcharger",
      "bags",
      "bavin",
      "beautifiers",
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
    ];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const product = await Product.create({
      name,
      des,
      price,
      src,
      category,
      public_id: req.file?.public_id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products (optionally filter by category)
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query; // e.g. /api/products?category=headset
    const allowedCategories = [
      "headset",
      "carcharger",
      "bags",
      "bavin",
      "beautifiers",
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
    ];

    let filter = {};
    if (category && allowedCategories.includes(category)) {
      filter.category = category;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update (edit) a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, des, price, src, public_id, category } = req.body;
    const allowedCategories = [
      "headset",
      "carcharger",
      "bags",
      "bavin",
      "beautifiers",
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
    ];
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, des, price, src, category, public_id: req.file?.public_id },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
