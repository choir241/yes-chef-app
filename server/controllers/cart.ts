import express from "express";
import { Client_Connect } from "../config/db.ts";
import { ObjectId } from "mongodb";
import "dotenv/config";

export const cartController = {
  getCart: async (req: express.Request, res: express.Response) => {
    const client = await Client_Connect();
    const db = client.db("restaurant");
    const collection = db.collection("cart");
    const cart = await collection.find({}).toArray();
    res.status(200).json(cart);
  },

  addToCart: async (req: express.Request, res: express.Response) => {
    const client = await Client_Connect();
    const db = client.db("restaurant");
    const collection = db.collection("cart");
    const cart = await collection.insertOne({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json(cart);
  },

  updateCart: async (req: express.Request, res: express.Response) => {
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
  },

  deleteCart: async (req: express.Request, res: express.Response) => {
    const client = await Client_Connect();
    const id = new ObjectId(req.params.id);
    const db = client.db("restaurant");
    const collection = db.collection("cart");
    const cart = await collection.deleteOne({ _id: id });
    res.status(200).json(cart);
  },
};

export default cartController;
