import express from "express";
import { Client_Connect } from "../config/db.ts";
import { ObjectId } from "mongodb";
import "dotenv/config";

export const kitchenController = {
  getTickets: async (req: express.Request, res: express.Response) => {
    const client = await Client_Connect();
    const db = client.db("restaurant");
    const collection = db.collection("kitchen");
    const tickets = await collection.find({}).toArray();
    res.status(200).json(tickets);
  },

  addTicket: async (req: express.Request, res: express.Response) => {
    const client = await Client_Connect();
    const db = client.db("restaurant");
    const collection = db.collection("kitchen");
    const ticket = await collection.insertOne({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json(ticket);
  },

  updateTicket: async (req: express.Request, res: express.Response) => {
    const client = await Client_Connect();
    const id = new ObjectId(req.params.id);
    const db = client.db("restaurant");
    const collection = db.collection("kitchen");
    const ticket = await collection.updateOne(
      { _id: id },
      {
        $set: {
          status: req.body.status,
          items: req.body.items,
          updatedAt: new Date(),
        },
      },
    );
    res.status(200).json(ticket);
  },

  deleteTicket: async (req: express.Request, res: express.Response) => {
    const client = await Client_Connect();
    const id = new ObjectId(req.params.id);
    const db = client.db("restaurant");
    const collection = db.collection("kitchen");
    const ticket = await collection.deleteOne({ _id: id });
    res.status(200).json(ticket);
  },
};

export default kitchenController;
