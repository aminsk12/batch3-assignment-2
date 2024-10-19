import express from 'express';
import { ProductController } from './product.controller';

const route = express.Router();

route.post('/', ProductController.createProduct);
route.get('/', ProductController.getAllProductAndSearch);
route.get('/:productId', ProductController.getProductById);
route.put('/:productId', ProductController.updateProductById);
route.delete('/:productId', ProductController.deleteProductById);

export const productsRoute = route;