import express from "express";

const router = express.Router();

router.get("/users");
router.get("/users/:id");
router.post("/users");
router.patch("/users/:id");
router.delete("/users/:id");

export default router;
