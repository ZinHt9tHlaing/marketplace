import { axiosInstance } from "../axiosInstance";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  username: string;
}

// register new account
export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await axiosInstance.post("/auth/register", payload, {
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

// login account
export const loginUser = async (payload: LoginPayload) => {
  try {
    const response = await axiosInstance.post("/auth/login", payload, {
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
