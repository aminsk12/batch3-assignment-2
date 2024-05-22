"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/', product_controller_1.createProduct);
router.get('/', product_controller_1.getAllProducts);
router.get('/:productId', product_controller_1.getProductById);
router.put('/:productId', product_controller_1.updateProduct);
router.delete('/:productId', product_controller_1.deleteProduct);
router.get('/searchTerm', product_controller_1.getSerchProducts);
exports.ProductRoutes = router;
