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

// server/controllers/order.ts
import express2 from "express";

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

// server/controllers/ingredient.ts
import express from "express";
import { ObjectId } from "mongodb";
var router = express.Router();
router.get("/ingredients", (req, res) => __async(void 0, null, function* () {
  try {
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    const client = yield Client_Connect();
    const db = client.db("Inventory");
    const collection = db.collection("Ingredients");
    console.log("Starting fetching of ingredients");
    const ingredients = yield collection.find({}).toArray();
    res.status(200).json(ingredients);
    console.log("Ingredients were successfully fetched!");
    client.close();
  } catch (err) {
    console.error("Failed to fetch ingredients: ", err);
    process.exit(1);
  }
}));
router.get("/ingredients/wasteToday/:id", (req, res) => {
  console.log(`Received GET request for wasteToday ID: ${req.params.id}`);
  res.json({ message: `WasteToday endpoint hit for ${req.params.id}` });
});
router.patch("/ingredients/updateQuantity/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const id = new ObjectId(req.params.id);
    const updates = Math.ceil(req.body.quantity);
    if (!Number.isInteger(updates)) {
      throw new Error("updates must be a number");
    } else if (updates < 0) {
      throw new Error("quantity must be greater than 0");
    }
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    const client = yield Client_Connect();
    const db = client.db("Inventory");
    const collection = db.collection("Ingredients");
    console.log("Starting updating ingredients");
    const result = yield collection.updateOne(
      { _id: id },
      {
        $set: {
          quantity: updates,
          updatedAt: /* @__PURE__ */ new Date()
        }
      }
    );
    if (result.matchedCount === 1) {
      res.status(200).send({ message: "ingredient updated" });
    }
  } catch (err) {
    console.error("Failed update quantity of ingredient: ", err);
    process.exit(1);
  }
}));
router.patch("/ingredients/wasteToday/:id", (req, res) => __async(void 0, null, function* () {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }
    const id = new ObjectId(req.params.id);
    const updates = Math.ceil(req.body.wasteToday);
    if (!Number.isInteger(updates)) {
      throw new Error("quantity wasted must be a number");
    } else if (updates < 0) {
      throw new Error("quantity wasted must be greater than 0");
    }
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    const client = yield Client_Connect();
    const db = client.db("Inventory");
    const collection = db.collection("Ingredients");
    console.log("Starting updating ingredient waste");
    const ingredient = yield collection.findOne({ _id: id });
    if (!ingredient) {
      client.close();
      return res.status(404).json({ error: "Ingredient not found" });
    }
    const result = yield collection.updateOne(
      { _id: id },
      {
        $set: {
          wasteToday: updates,
          updatedAt: /* @__PURE__ */ new Date()
        }
      }
    );
    if (result.matchedCount === 1) {
      res.status(200).send({ message: "ingredient waste updated" });
    }
  } catch (err) {
    console.error("Failed update of ingredient waste: ", err);
    process.exit(1);
  }
}));
var decrementIngredients = (menuItems, ingredientsCollection) => __async(void 0, null, function* () {
  menuItems.map((item) => {
    item.ingredients.map((ingredient) => __async(void 0, null, function* () {
      var _a;
      yield ingredientsCollection.updateOne(
        //filter by the ingredient name in the dish
        { name: ingredient.ingredientName },
        //increase by negative one (decrease by 1) and update timestamp
        {
          $inc: { quantity: -1 * ((_a = item.cartAmount) != null ? _a : 1) },
          $set: { updatedAt: /* @__PURE__ */ new Date() }
        }
      );
    }));
  });
});
router.put("/updateIngredientQuantity", (req, res) => __async(void 0, null, function* () {
  try {
    if (req.body.status === "completed") {
      const client = yield Client_Connect();
      const db = client.db("Inventory");
      const collection = db.collection("Ingredients");
      const menuItems = req.body.items;
      yield decrementIngredients(menuItems, collection);
      res.status(200).json("Ingredients quantities were successfully updated");
    } else {
      res.status(200).json("Order needs to be completed");
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}));

// server/controllers/order.ts
var router2 = express2.Router();
router2.get("/orders", (req, res) => __async(void 0, null, function* () {
  try {
    const client = yield Client_Connect();
    const db = client.db("Point_of_sale_system");
    const collection = db.collection("Order");
    const orders = yield collection.find().toArray();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching orders" });
  }
}));
router2.post("/orders", (req, res) => __async(void 0, null, function* () {
  const { orderId, items, status } = req.body;
  try {
    const client = yield Client_Connect();
    const db = client.db("Point_of_sale_system");
    const collection = db.collection("Order");
    const newOrder = yield collection.insertOne({
      orderId,
      items,
      status,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error creating order" });
  }
}));
router2.patch("/orders/status", (req, res) => __async(void 0, null, function* () {
  try {
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    const client = yield Client_Connect();
    const db = client.db("Point_of_sale_system");
    const collection = db.collection("Order");
    const updatedOrder = yield collection.findOneAndUpdate(
      { orderId: req.body.ticket.orderId },
      { $set: { status: req.body.status } },
      { returnDocument: "after" }
    );
    if ((updatedOrder == null ? void 0 : updatedOrder.status) === "completed") {
      const ingredientsDb = client.db("Inventory");
      const ingredientsCollection = ingredientsDb.collection("Ingredients");
      yield decrementIngredients(updatedOrder.items, ingredientsCollection);
    }
    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error updating order status" });
  }
}));
var order_default = router2;
export {
  order_default as default
};
