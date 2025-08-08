export const API_ROUTES = {
  POST_REGISTER: "/auth/register",
  POST_LOGIN: "/auth/login",
  POST_VERIFY_EMAIL: "/auth/verify-email",
  GET_LOGOUT: "/auth/logout",
  GET_ME: "/auth/me",
  POST_FORGOT_PASSWORD: "/auth/forgot-password",

  // task
  GET_TASKS: "/tasks",
  POST_TASKS: "/tasks",
  GET_SINGLE_TASK: (taskId) => `/tasks/${taskId}`,
  PATCH_TASKS: (taskId) => `/tasks/${taskId}`,
  DELETE_TASKS: (taskId) => `/tasks/${taskId}`,

  // notifications
  GET_NOTIFICATIONS: "/notification",
  PATCH_NOTIFICATIONS: (notificationId) =>
    `/notification/${notificationId}/read`,
};
