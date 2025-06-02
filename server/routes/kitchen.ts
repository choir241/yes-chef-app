import express from "express";
const router = express.Router();
import { kitchenController } from "../controllers/kitchen.ts";

router.get("/tickets", kitchenController.getTickets);
router.post("/addTicket", kitchenController.addTicket);
router.patch("/updateTicket/:id", kitchenController.updateTicket);
router.delete("/deleteTicket/:id", kitchenController.deleteTicket);

export default router;
