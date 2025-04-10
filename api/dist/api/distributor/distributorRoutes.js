"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var distributorController_ts_1 = require("./distributorController.ts");
var router = express_1.default.Router();
// router.get('/api/distributor', getDistributorIngredients);
router.get('/api/distributor/search/:query', distributorController_ts_1.getDistributorIngredients);
exports.default = router;
