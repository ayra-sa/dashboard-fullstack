import express from "express";
import { createProduct, getProductById, getProducts } from "../controllers/Products.js";

const router = express.Router();

router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.patch("/product/:id");
router.delete("/product/:id");

export default router;
