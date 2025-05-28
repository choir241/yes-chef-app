import express from "express";
const router = express.Router();
import "dotenv/config";
import { Client_Connect } from "../config/db.ts";
import { ObjectId } from "mongodb";

router.get("/cart", async (req, res) => {
  const client = await Client_Connect();

  const db = client.db("restaurant");
  const collection = db.collection("cart");
  const cart = await collection.find({}).toArray();

  res.status(200).json(cart);
});

router.post("/addToCart", async (req, res) => {
  const client = await Client_Connect();

  const db = client.db("restaurant");
  const collection = db.collection("cart");
  const cart = await collection.insertOne({
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(200).json(cart);
});

router.patch("/updateCart/:id", async (req, res) => {
  const client = await Client_Connect();

  const id = new ObjectId(req.params.id);

  const db = client.db("restaurant");
  const collection = db.collection("cart");
  const cart = await collection.updateOne(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        instructions: req.body.instructions,
        updatedAt: new Date(),
      },
    },
  );

  res.status(200).json(cart);
});

router.delete("/deleteCart/:id", async (req, res) => {
  const client = await Client_Connect();

  const id = new ObjectId(req.params.id);

  const db = client.db("restaurant");
  const collection = db.collection("cart");
  const cart = await collection.deleteOne({ _id: id });

  res.status(200).json(cart);
});

export default router;
