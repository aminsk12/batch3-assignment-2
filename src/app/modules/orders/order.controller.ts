import { Request, Response } from 'express';
import { OrderService } from './order.services';
import orderValidationSchema from './order.validetor';


//createOrder Api

const createOrder = async (req: Request, res: Response) => {
  try {
    const { orders } = req.body;

    //orderValidation with Zod

    const zodValidationOrder = orderValidationSchema.parse(orders);

    const result = await OrderService.createOrderIntoDB(zodValidationOrder);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

//getAllOrder Api

const getAllAndSearchOrder = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    const result = await OrderService.getAllOrderAndSearchIntoDB(
      email as string,
    );

    if (email) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllAndSearchOrder,
};