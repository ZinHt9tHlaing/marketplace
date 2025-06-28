import { axiosInstance } from "../axiosInstance";

interface ProductType {
  product_name: string;
  product_description: string;
  product_price: number;
  product_category: string;
  product_used_for: string;
  product_details: string[];
}

export const createProduct = async (payload: ProductType) => {
  try {
    const response = await axiosInstance.post("/create-product", payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return error;
    }
  }
};
