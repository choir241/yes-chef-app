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

// server/controllers/kitchen.ts
import express from "express";

// config/config.ts
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
var env = "./config/.env";
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

// server/controllers/kitchen.ts
var router = express.Router();
router.post("/addToKitchen", (req, res) => __async(void 0, null, function* () {
  try {
    const client = yield Client_Connect();
    const db = client.db("Kitchen");
    const collection = db.collection("Cart");
    console.log("Starting to add to cart");
    const menuItem = yield collection.insertOne({
      cartAmt: req.body.cartAmt,
      name: req.body.name,
      ingredients: req.body.ingredients,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      prepTime: req.body.prepTime,
      image: req.body.image,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    res.status(200).json({ message: "Menu item was successfully added to the cart.", menuItem });
    client.close();
  } catch (err) {
    console.error("Failed to add to kitchen ", err);
    process.exit(1);
  }
}));
var kitchen_default = router;
export {
  kitchen_default as default
};
