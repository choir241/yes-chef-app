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

// server/app.ts
import express7 from "express";

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

// server/controllers/menu.ts
import express from "express";
var router = express.Router();
router.get("/menu", (req, res) => __async(void 0, null, function* () {
  try {
    const client = yield Client_Connect();
    const db = client.db("Point_of_sale_system");
    const collection = db.collection("Menu");
    console.log("Starting fetching of ingredients");
    const ingredients = yield collection.find({}).toArray();
    res.status(200).json(ingredients);
    console.log("Ingredients were successfully fetched!");
  } catch (err) {
    console.error("Failed to fetch ingredients: ", err);
    process.exit(1);
  }
}));
var menu_default = router;

// server/controllers/ingredient.ts
import express2 from "express";
import { ObjectId } from "mongodb";

// config/config.ts
import dotenv2 from "dotenv";
import { MongoClient as MongoClient2 } from "mongodb";
var env2 = "./config/.env";
dotenv2.config({ path: env2 });
var SERVER2 = {
  SERVER_HOSTNAME: process.env.SERVER_HOSTNAME || "localhost",
  SERVER_PORT: process.env.PORT || 8e3
};
var Client_Connect2 = () => __async(void 0, null, function* () {
  try {
    const client = yield MongoClient2.connect(
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
var router2 = express2.Router();
router2.get("/ingredients", (req, res) => __async(void 0, null, function* () {
  try {
    const client = yield Client_Connect2();
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
router2.get("/ingredients/wasteToday/:id", (req, res) => {
  console.log(`Received GET request for wasteToday ID: ${req.params.id}`);
  res.json({ message: `WasteToday endpoint hit for ${req.params.id}` });
});
router2.patch("/ingredients/updateQuantity/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const id = new ObjectId(req.params.id);
    const updates = Math.ceil(req.body.quantity);
    if (!Number.isInteger(updates)) {
      throw new Error("updates must be a number");
    } else if (updates < 0) {
      throw new Error("quantity must be greater than 0");
    }
    const client = yield Client_Connect2();
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
router2.patch("/ingredients/wasteToday/:id", (req, res) => __async(void 0, null, function* () {
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
    const client = yield Client_Connect2();
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
router2.put("/updateIngredientQuantity", (req, res) => __async(void 0, null, function* () {
  try {
    if (req.body.status === "completed") {
      const client = yield Client_Connect2();
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
var ingredient_default = router2;

// server/controllers/order.ts
import express3 from "express";
var router3 = express3.Router();
router3.get("/orders", (req, res) => __async(void 0, null, function* () {
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
router3.post("/orders", (req, res) => __async(void 0, null, function* () {
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
router3.patch("/orders/status", (req, res) => __async(void 0, null, function* () {
  try {
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
var order_default = router3;

// server/controllers/kitchen.ts
import express4 from "express";
var router4 = express4.Router();
router4.post("/addToKitchen", (req, res) => __async(void 0, null, function* () {
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
var kitchen_default = router4;

// server/controllers/metrics.ts
import express5 from "express";
import { ObjectId as ObjectId2 } from "mongodb";
var router5 = express5.Router();
router5.get("/metrics/:id", (req, res) => __async(void 0, null, function* () {
  try {
    const id = new ObjectId2(req.params.id);
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
router5.post("/metrics", (req, res) => __async(void 0, null, function* () {
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
var metrics_default = router5;

// server/app.ts
import path from "path";
import cors from "cors";

// server/api/distributor/distributorRoutes.ts
import express6 from "express";

// server/api/distributor/distributorService.ts
import axios from "axios";

// server/api/distributor/fallbackData.ts
var fallbackData = {
  fallback: true,
  data: [
    {
      id: 1,
      name: "Ingredient 1",
      description: "Mock ingredient 1"
    },
    {
      id: 2,
      name: "Ingredient 2",
      description: "Mock ingredient 2"
    }
  ]
};

// server/api/distributor/distributorService.ts
var BASE_URL = "https://api.spoonacular.com";
var API_KEY = process.env.SPOONACULAR_API_KEY;
var fetchIngredientData = (query) => __async(void 0, null, function* () {
  try {
    const response = yield axios.get(`${BASE_URL}/food/ingredients/search`, {
      params: {
        query,
        apiKey: API_KEY,
        number: 1
      }
    });
    if (!response.data.results || response.data.results.length === 0) {
      return {
        success: false,
        error: true,
        message: `No ingredients found for query "${query}".`,
        data: fallbackData.data
      };
    }
    return {
      success: true,
      data: response.data.results
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      fallback: true,
      data: fallbackData.data,
      message: "Using backup data due to API error"
    };
  }
});

// server/api/distributor/distributorController.ts
var getDistributorIngredients = (req, res) => __async(void 0, null, function* () {
  var _a;
  const { query } = req.params;
  try {
    const data = yield fetchIngredientData(query);
    if (!data.success || data.error) {
      return res.status(200).json({
        success: false,
        message: "Failed to fetch data, showing fallback data",
        data: fallbackData.data
      });
    }
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: data.data
    });
  } catch (error) {
    if (error.code === "ENOTFOUND" || ((_a = error.response) == null ? void 0 : _a.status) === 503) {
      console.error("API is offline or unavailable:", error);
      return res.status(503).json({
        success: false,
        message: "API is offline or unavailable",
        data: fallbackData.data
      });
    }
    console.error("Error fetching distributor ingredients:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch data"
    });
  }
});

// server/api/distributor/distributorRoutes.ts
var router6 = express6.Router();
router6.get("/api/distributor/search/:query", getDistributorIngredients);
var distributorRoutes_default = router6;

// server/app.ts
function startServer() {
  return __async(this, null, function* () {
    try {
      console.log("Starting Express Application");
      const app = express7();
      app.use(express7.urlencoded({ extended: true }));
      app.use(express7.json());
      app.use(cors());
      console.log("Connect to the database");
      app.use("/", ingredient_default, kitchen_default, menu_default, order_default, metrics_default, distributorRoutes_default);
      app.get("*", (req, res) => {
        res.sendFile(path.join("../../client/dist", "index.html"));
      });
      yield app.listen(process.env.PORT, () => {
        console.log(`The Server is running use ^c to chill server`);
        console.log(
          `Server started on ${SERVER.SERVER_HOSTNAME}:${process.env.PORT}`
        );
      });
      return app;
    } catch (err) {
      console.error("Failed to start server:", err);
      process.exit(1);
    }
  });
}
startServer();
