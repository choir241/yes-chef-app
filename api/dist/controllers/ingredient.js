"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrementIngredients = void 0;
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var config_ts_1 = require("../config.ts");
var router = express_1.default.Router();
router.get("/ingredients", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, db, collection, ingredients, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                //allows cors for front end api
                res.set('Access-Control-Allow-Origin', 'https://yes-chef-app.vercel.app/');
                return [4 /*yield*/, (0, config_ts_1.Client_Connect)()];
            case 1:
                client = _a.sent();
                db = client.db("Inventory");
                collection = db.collection("Ingredients");
                console.log("Starting fetching of ingredients");
                return [4 /*yield*/, collection.find({}).toArray()];
            case 2:
                ingredients = _a.sent();
                res.status(200).json(ingredients);
                console.log("Ingredients were successfully fetched!");
                client.close();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error("Failed to fetch ingredients: ", err_1);
                process.exit(1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/ingredients/wasteToday/:id", function (req, res) {
    console.log("Received GET request for wasteToday ID: ".concat(req.params.id));
    res.json({ message: "WasteToday endpoint hit for ".concat(req.params.id) });
});
//manual update of ingredient quantity on ingredients
router.patch("/ingredients/updateQuantity/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_1, updates, client, db, collection, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id_1 = new mongodb_1.ObjectId(req.params.id);
                updates = Math.ceil(req.body.quantity);
                //guard clauses
                if (!Number.isInteger(updates)) {
                    throw new Error("updates must be a number");
                }
                else if (updates < 0) {
                    throw new Error("quantity must be greater than 0");
                }
                //allows cors for front end api
                res.set('Access-Control-Allow-Origin', 'https://yes-chef-app.vercel.app/');
                return [4 /*yield*/, (0, config_ts_1.Client_Connect)()];
            case 1:
                client = _a.sent();
                db = client.db("Inventory");
                collection = db.collection("Ingredients");
                console.log("Starting updating ingredients");
                return [4 /*yield*/, collection.updateOne(function () { _id: id_1; }, { $set: {
                            quantity: updates,
                            updatedAt: new Date()
                        }
                    })];
            case 2:
                result = _a.sent();
                if (result.matchedCount === 1) {
                    res.status(200).send({ message: 'ingredient updated' });
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error("Failed update quantity of ingredient: ", err_2);
                process.exit(1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//manual update of ingredient waste on reports
router.patch("/ingredients/wasteToday/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_2, updates, client, db, collection, ingredient, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                // const id = new ObjectId(req.params.id)
                if (!mongodb_1.ObjectId.isValid(req.params.id)) {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid ObjectId format" })];
                }
                id_2 = new mongodb_1.ObjectId(req.params.id);
                updates = Math.ceil(req.body.wasteToday);
                //guard clauses
                if (!Number.isInteger(updates)) {
                    throw new Error("quantity wasted must be a number");
                }
                else if (updates < 0) {
                    throw new Error("quantity wasted must be greater than 0");
                }
                //allows cors for front end api
                res.set('Access-Control-Allow-Origin', 'https://yes-chef-app.vercel.app/');
                return [4 /*yield*/, (0, config_ts_1.Client_Connect)()];
            case 1:
                client = _a.sent();
                db = client.db("Inventory");
                collection = db.collection("Ingredients");
                console.log("Starting updating ingredient waste");
                return [4 /*yield*/, collection.findOne(function () { _id: id_2; })];
            case 2:
                ingredient = _a.sent();
                if (!ingredient) {
                    client.close(); // Close connection if ingredient doesn't exist
                    return [2 /*return*/, res.status(404).json({ error: "Ingredient not found" })];
                }
                return [4 /*yield*/, collection.updateOne(function () { _id: id_2; }, { $set: {
                            wasteToday: updates,
                            updatedAt: new Date()
                        }
                    })];
            case 3:
                result = _a.sent();
                if (result.matchedCount === 1) {
                    res.status(200).send({ message: 'ingredient waste updated' });
                }
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                console.error("Failed update of ingredient waste: ", err_3);
                process.exit(1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var decrementIngredients = function (menuItems, ingredientsCollection) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        menuItems.map(function (item) {
            // go through each ingredient
            item.ingredients.map(function (ingredient) { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, ingredientsCollection.updateOne(
                            //filter by the ingredient name in the dish
                            { name: ingredient.ingredientName }, 
                            //increase by negative one (decrease by 1) and update timestamp
                            {
                                $inc: { quantity: -1 * ((_a = item.cartAmount) !== null && _a !== void 0 ? _a : 1) },
                                $set: { updatedAt: new Date() }
                            })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        return [2 /*return*/];
    });
}); };
exports.decrementIngredients = decrementIngredients;
router.put("/updateIngredientQuantity", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, db, collection, menuItems, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(req.body.status === "completed")) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, config_ts_1.Client_Connect)()];
            case 1:
                client = _a.sent();
                db = client.db("Inventory");
                collection = db.collection("Ingredients");
                menuItems = req.body.items;
                return [4 /*yield*/, (0, exports.decrementIngredients)(menuItems, collection)];
            case 2:
                _a.sent();
                res.status(200).json("Ingredients quantities were successfully updated");
                return [3 /*break*/, 4];
            case 3:
                res.status(200).json("Order needs to be completed");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                console.error(err_4);
                process.exit(1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
