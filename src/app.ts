import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes.ts";
import vendorRoutes from "./modules/vendor/vendor.route.ts";
import productRoutes from "./modules/product/product.rotue.ts";
import categoryRoutes from "./modules/category/category.route.ts";

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

export default app;