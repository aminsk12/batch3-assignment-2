import { Product } from "./product.interface";
import ProductModel from "./product.model";

const createProductIntoDb = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};
const getAllProductIntoDb = async () => {
  const result = await ProductModel.find();
  return result;
};
const getsingleProductIntoDb = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};
const updateProductIntoDb = async (
  id: string,
  updateData: any,
  options = { new: true }
) => {
  const result = await ProductModel.findByIdAndUpdate(id, updateData, options);
  return result;
};

const delitProductIntoDb = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

const searchProductsIntoDB = async (searchTerm: string) => {
  const query = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
          { tags: { $regex: searchTerm, $options: "i" } },
        ],
      }
    : {};

  const result = await ProductModel.find(query);
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductIntoDb,
  getsingleProductIntoDb,
  updateProductIntoDb,
  delitProductIntoDb,
  searchProductsIntoDB,
};
