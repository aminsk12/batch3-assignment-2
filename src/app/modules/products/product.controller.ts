import { Request, Response } from 'express';
import { productValidationSchema } from './product.validator';
import { ProductService } from './product.service';

//createProduct Api

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    //validation with Zod

    const zodProductValidation = productValidationSchema.parse(product);

    const result =
      await ProductService.createProductIntoDB(zodProductValidation);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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

//getAllProductAndSearch Api

const getAllProductAndSearch = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  try {
    const result = await ProductService.getAllProductAndSearchIntoDB(
      searchTerm as string,
    );

    if (searchTerm) {
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
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

//Product by ID Api

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getProductByIdInToDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

//Update Product Api

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    //validation with Zod

    const zodUpdateDataValidation = productValidationSchema.parse(updateData);
    const result = await ProductService.updateProductByIdInToDB(
      productId,
      zodUpdateDataValidation,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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

//Delete a Product Api

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deleteProductByIdInToDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
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

export const ProductController = {
  createProduct,
  getAllProductAndSearch,
  getProductById,
  updateProductById,
  deleteProductById,
};