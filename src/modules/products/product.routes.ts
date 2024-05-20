import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProducts, updateProduct } from './product.controller';


const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:productId', getProductById);
router.put('/products/:productId', updateProduct);
router.delete('/products/:productId', deleteProduct);
router.get('/products/search', searchProducts);


export const ProductRoutes = router;