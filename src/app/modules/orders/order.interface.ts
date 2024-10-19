import mongoose, { Document} from 'mongoose';

export interface Order extends Document {
  email: string;
  productId: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}