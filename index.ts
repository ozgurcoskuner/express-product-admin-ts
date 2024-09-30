import express, { Application } from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import connectDB from "./config/db";
import cors from "cors";
dotenv.config();

const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
