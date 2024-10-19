import { ProductModel } from './product.model';
import { Product } from './product.interface';

//createProduct Api

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

//getAllProduct and search Api

const getAllProductAndSearchIntoDB = async (searchTerm: string) => {
  let result;
  if (searchTerm) {
    result = await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  } else {
    result = await ProductModel.find();
  }
  return result;
};

//Product by ID Api

const getProductByIdInToDB = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};

//Update Product Api

const updateProductByIdInToDB = async (
  productId: string,
  updateData: Product,
) => {
  const result = await ProductModel.findByIdAndUpdate(
    { _id: productId },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

//Delete a Product Api

const deleteProductByIdInToDB = async (productId: string) => {
  const result = await ProductModel.deleteOne({ _id: productId });
  return result;
};

//Search a product Api

// const searchProductName = async () => {

//   return result;
// };

export const ProductService = {
  createProductIntoDB,
  getAllProductAndSearchIntoDB,
  getProductByIdInToDB,
  updateProductByIdInToDB,
  deleteProductByIdInToDB,
};