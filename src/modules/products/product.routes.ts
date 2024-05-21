import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProducts, updateProduct } from './product.controller';


const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);
router.get('/search', searchProducts);


export const ProductRoutes = router;