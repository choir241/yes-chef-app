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
export {
  fetchIngredientData
};
