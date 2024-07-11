import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/product", verifyUser, getProducts);
router.get("/product/:id", verifyUser, getProductById);
router.post("/product", verifyUser, createProduct);
router.patch("/product/:id", verifyUser, updateProduct);
router.delete("/product/:id", verifyUser, deleteProduct);

export default router;
