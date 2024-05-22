import mongoose, { Schema } from "mongoose";
import { Order } from "./order.interface";

const orderSchema = new Schema<Order>({
    email: { type: String, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  });
  
  const OrderModel = mongoose.model<Order>('Order', orderSchema);
  
  export default OrderModel;