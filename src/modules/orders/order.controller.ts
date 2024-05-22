import ProductModel from "../products/product.model";
import { Request, Response } from "express";
import OrderModel from "./order.model";
import { orderSchema } from "./order.validetor";

export const createOrder = async (req: Request, res: Response) => {
  const { error } = orderSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const { productId, quantity } = req.body;
    const product = await ProductModel.findById(productId);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    if (product.inventory.quantity < quantity)
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });

    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    const order = new OrderModel(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    const orders = await OrderModel.find({ email: email as string });
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
