import { Request, Response } from "express";
import Joi from "joi";
import ProductModel from "./product.model";
import { ProductServices } from "./product.service";

export const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required(),
        value: Joi.string().required(),
      })
    )
    .required(),
  inventory: Joi.object({
    quantity: Joi.number().required(),
    inStock: Joi.boolean().required(),
  }).required(),
});

export const createProduct = async (req: Request, res: Response) => {
  const { error } = productSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const prduct = req.body;
    const result = await ProductServices.createProductIntoDb(prduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductServices.getAllProductIntoDb();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const data = req.params.productId;
    const product = await ProductServices.getsingleProductIntoDb(data);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { error } = productSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const productId = req.params.productId;
    const updateData = req.body;
    const product = await ProductServices.updateProductIntoDb(
      productId,
      updateData,
      { new: true }
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.delitProductIntoDb(
      req.params.productId
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSerchProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await ProductServices.searchProductsIntoDB(
      searchTerm as string
    );
    console.log(result);
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `${searchTerm} Product not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Product ${searchTerm ? "searched" : "fetched"} successfully`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch All Products!",
      error: err,
    });
  }
};
