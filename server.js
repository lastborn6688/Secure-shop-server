import express from "express";
import dotenv from "dotenv";
import cors from "cors";    

import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";


dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());    

app.use("/api/products", productRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});