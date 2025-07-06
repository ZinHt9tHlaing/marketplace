import type {
  deleteSavedImagePayload,
  GetAllProductsResponse,
  ProductType,
} from "../../types/products/productTypes";
import { axiosInstance } from "../axiosInstance";

// create product
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

// get all products
export const getAllProducts = async (): Promise<GetAllProductsResponse> => {
  try {
    const response = await axiosInstance.get<GetAllProductsResponse>(
      "/get-all-products",
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

// get old product
export const getOldProduct = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/get-old-product/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

// update product
export const updateProduct = async (payload: ProductType) => {
  try {
    const response = await axiosInstance.put("/update-product", payload, {
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

// delete product
export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/delete-product/${id}`, {
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

// upload product image
export const uploadProductImage = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(
      "/upload-product-image",
      payload,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return error;
    }
  }
};

// get product saved images
export const getProductSavedImages = async (productId: string) => {
  try {
    const response = await axiosInstance.get(
      `/get-product-saved-images/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return error;
    }
  }
};

// delete product image
export const deleteSavedImages = async (payload: deleteSavedImagePayload) => {
  try {
    const { productId, imgToDelete } = payload;
    const encodeImgToDelete = encodeURIComponent(imgToDelete);

    const response = await axiosInstance.delete(
      `/delete-product-images/${productId}/${encodeImgToDelete}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return error;
    }
  }
};
