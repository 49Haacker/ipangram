import axios from "../axios";
import { API_ROUTES } from "./apiRoutes";

export const createUser = async (payload) => {
  try {
    const response = await axios.post(API_ROUTES.POST_REGISTER, payload);
    // console.log("response =", response.data);
    if (response.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    // console.error("Failed to logout:", error?.response?.data);
    const errorMessage = error?.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
};

export const loginUser = async (payload) => {
  try {
    // console.log(payload);

    const response = await axios.post(API_ROUTES.POST_LOGIN, payload);
    // console.log("response =", response.data);
    if (response.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    // console.error("Failed to logout:", error?.response?.data);
    const errorMessage = error?.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
};

export const verifyEmail = async (payload) => {
  try {
    const response = await axios.post(API_ROUTES.POST_VERIFY_EMAIL, payload);
    // console.log("response =", response.data);
    if (response.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    // console.error("Failed to logout:", error?.response?.data);
    const errorMessage = error?.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get(API_ROUTES.GET_LOGOUT);
    // console.log("response =", response.data);
    if (response.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    // console.error("Failed to logout:", error?.response?.data);
    const errorMessage = error?.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(API_ROUTES.GET_ME);
    // console.log("response =", response.data);
    if (response.data?.statusCode === 200) {
      return response?.data?.data || [];
    }
  } catch (error) {
    // console.error("Failed to logout:", error?.response?.data);
    const errorMessage = error?.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
};

export const createTask = async (payload) => {
  try {
    const response = await axios.post(API_ROUTES.POST_TASKS, { task: payload });
    // console.log("response =", response.data);
    if (response.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    // console.error("Failed to logout:", error?.response?.data);
    const errorMessage = error?.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
};
