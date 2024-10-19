import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById,  getSerchProducts,  updateProduct } from './product.controller';


const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);
router.get('/searchTerm', getSerchProducts);


export const ProductRoutes = router;