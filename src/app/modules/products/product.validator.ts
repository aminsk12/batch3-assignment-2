import { z } from 'zod';

// Define the Variant schema
export const variantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required.' }),
  value: z.string().min(1, { message: 'Variant value is required.' }),
});

// Define the Inventory schema
export const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Inventory quantity cannot be less than 0.' }),
  inStock: z.boolean({ required_error: 'In-stock status is required.' }),
});

// Define the Product schema
export const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required.' }),
  description: z
    .string()
    .min(10, { message: 'Product description is required.' }),
  price: z.number().min(0, { message: 'Product price cannot be less than 0.' }),
  category: z.string().min(1, { message: 'Product category is required.' }),
  tags: z.array(z.string()).min(1, { message: 'Product tags are required.' }),
  variants: z
    .array(variantValidationSchema)
    .min(1, { message: 'Product variants are required.' }),
  inventory: inventoryValidationSchema,
});