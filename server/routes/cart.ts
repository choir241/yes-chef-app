import express from "express";
const router = express.Router();
import "dotenv/config";
import { Client_Connect } from "../config/db.ts";

router.get("/cart", async(req, res) => {
    const client = await Client_Connect();

    const db = client.db("restaurant");
    const collection = db.collection("cart");
    const cart = await collection.find({}).toArray();

    res.status(200).json(cart);
});

router.post("/addToCart", async(req, res) => {
    const client = await Client_Connect();

    const db = client.db("restaurant");
    const collection = db.collection("cart");
    const cart = await collection.insertOne(req.body);

    res.status(200).json(cart);
});

export default router;
