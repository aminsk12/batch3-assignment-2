import mongoose, { Document, Schema } from 'mongoose';

interface Order extends Document {
  email: string;
  productId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

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
