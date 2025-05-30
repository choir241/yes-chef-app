import express from "express";
const router = express.Router();
import { cartController } from "../controllers/cart.ts";

router.get("/cart", cartController.getCart);
router.post("/addToCart", cartController.addToCart);
router.patch("/updateCart/:id", cartController.updateCart);
router.delete("/deleteCart/:id", cartController.deleteCart);

export default router;