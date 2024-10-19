import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z.string().min(1, { message: 'Product ID is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
});

export default orderValidationSchema;