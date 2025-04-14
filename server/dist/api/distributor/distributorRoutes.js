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

// server/api/distributor/distributorRoutes.ts
import express from "express";

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
var router = express.Router();
router.get("/api/distributor/search/:query", getDistributorIngredients);
var distributorRoutes_default = router;
export {
  distributorRoutes_default as default
};
