import { Schema, model } from 'mongoose';
import { Inventory, Product, Variant } from './product.interface';

const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: [true, 'Variant type is required.'],
  },
  value: {
    type: String,
    required: [true, 'Variant value is required.'],
  },
});

const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required.'],
    min: [0, 'Inventory quantity cannot be less than 0.'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'In-stock status is required.'],
  },
});

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required.'],
    min: [0, 'Product price cannot be less than 0.'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required.'],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required.'],
  },
  variants: {
    type: [variantSchema],
    required: [true, 'Product variants are required.'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Product inventory details are required.'],
  },
});

export const ProductModel = model('Product', productSchema);