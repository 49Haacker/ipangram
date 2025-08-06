class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    stack = ""
  ) {
    // console.log("statusCode", statusCode);
    // console.log("message", message);
    // console.log("error", error);
    // console.log("stack", stack);
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
