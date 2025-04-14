var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// server/controllers/metrics.ts
import express from "express";
import { ObjectId } from "mongodb";

// server/config/config.ts
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
var env = ".env";
dotenv.config({ path: env });
var SERVER = {
  SERVER_HOSTNAME: process.env.SERVER_HOSTNAME || "localhost",
  SERVER_PORT: process.env.PORT || 8e3
};
var Client_Connect = () => __async(void 0, null, function* () {
  try {
    const client = yield MongoClient.connect(
      process.env.MONGO_URI,
      {
        ssl: true,
        connectTimeoutMS: 3e4,
        socketTimeoutMS: 45e3
      }
    );
    console.log("Client database connection was successful.");
    return client;
  } catch (err) {
    console.error("Failed to connect to Client:", err);
    process.exit(1);
  }
});

// server/controllers/metrics.ts
var router = express.Router();
router.get("/metrics/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const id = new ObjectId(req.params.id);
    const client = yield Client_Connect();
    const db = client.db("Point_of_sale_system");
    const collection = db.collection("Menu");
    console.log("Starting fetching of ingredients");
    const ingredients = yield collection.find({ _id: id }).toArray();
    res.status(200).json(ingredients);
    console.log("Ingredients were successfully fetched!");
  } catch (err) {
    console.error("Failed to fetch ingredients: ", err);
    process.exit(1);
  }
}));
router.post("/metrics", (req, res) => __async(void 0, null, function* () {
  try {
    const ingredientNames = req.body.ing;
    const client = yield Client_Connect();
    const db = client.db("Inventory");
    const collection = db.collection("Ingredients");
    const newIngredients = yield collection.find({
      name: { $in: ingredientNames }
    }).toArray();
    res.json(newIngredients);
  } catch (err) {
    console.error("Failed to fetch ingredients: ", err);
    process.exit(1);
  }
}));
var metrics_default = router;
export {
  metrics_default as default
};
