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

export const forgotPassword = async (payload) => {
  try {
    const response = await axios.post(API_ROUTES.POST_FORGOT_PASSWORD, payload);
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

export const getTaskLists = async (page = 1, pageLimit, searchTerm) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.set("page", page);
    if (searchTerm) {
      queryParams.set("search", searchTerm);
    }
    if (pageLimit === "All") {
      queryParams.set("All", "All");
    } else {
      queryParams.set("limit", pageLimit);
    }

    const response = await axios.get(
      `${API_ROUTES.GET_TASKS}?${queryParams.toString()}`
    );
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

export const getSingleTaskDetail = async (taskId) => {
  try {
    const response = await axios.get(API_ROUTES.GET_SINGLE_TASK(taskId));
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

export const updateTask = async (payload) => {
  // console.log(payload);
  try {
    const response = await axios.patch(API_ROUTES.PATCH_TASKS(payload.taskId), {
      taskInfo: payload.taskInfo,
    });
    // console.log("response =", response.data);
    if (response.data?.statusCode === 200) {
      return response?.data || [];
    }
  } catch (error) {
    // console.error("Failed to logout:", error?.response?.data);
    const errorMessage = error?.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
};

export const deleteTaskList = async (taskId) => {
  try {
    // console.log(taskId);
    const response = await axios.delete(API_ROUTES.DELETE_TASKS(taskId));
    // console.log("response =", response.data);
    if (response.data?.statusCode === 200) {
      return response?.data || [];
    }
  } catch (error) {
    // console.error("Failed to logout:", error?.response?.data);
    const errorMessage = error?.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(errorMessage));
  }
};

export const getNotifications = async () => {
  try {
    const response = await axios.get(API_ROUTES.GET_NOTIFICATIONS);
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

export const markasReadingNotification = async (payload) => {
  try {
    const response = await axios.patch(
      API_ROUTES.PATCH_NOTIFICATIONS(payload.notificationId),
      { read: payload.read }
    );
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
