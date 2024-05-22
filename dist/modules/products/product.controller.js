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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSerchProducts = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_service_1 = require("./product.service");
const product_validator_1 = require("./product.validator");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = product_validator_1.validatorProductSchema.validate(req.body);
    if (error)
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    try {
        const prduct = req.body;
        const result = yield product_service_1.ProductServices.createProductIntoDb(prduct);
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_service_1.ProductServices.getAllProductIntoDb();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: products,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.params.productId;
        const product = yield product_service_1.ProductServices.getsingleProductIntoDb(data);
        if (!product)
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: product,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = product_validator_1.validatorProductSchema.validate(req.body);
    if (error)
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    try {
        const productId = req.params.productId;
        const updateData = req.body;
        const product = yield product_service_1.ProductServices.updateProductIntoDb(productId, updateData, { new: true });
        if (!product)
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: product,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.ProductServices.delitProductIntoDb(req.params.productId);
        if (!product)
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: product,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.deleteProduct = deleteProduct;
const getSerchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.ProductServices.searchProductsIntoDB(searchTerm);
        console.log(result);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `${searchTerm} Product not found`,
            });
        }
        res.status(200).json({
            success: true,
            message: `Product ${searchTerm ? "searched" : "fetched"} successfully`,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch All Products!",
            error: err,
        });
    }
});
exports.getSerchProducts = getSerchProducts;
