import { NextResponse } from "next/server";
import { ApiResponse } from "./ApiResponse";
import { ApiError } from "./ApiError";
import { clearAuthCookies } from "./authUtils";

const beautifyFieldName = (field = "") => {
  if (!field) return "Field";
  return field
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const handleApiError = (error, request = {}) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeDatabaseError"
  ) {
    statusCode = 400;
    // message = error.errors?.map((e) => e.message).join(", ") || error.message;
    message =
      error.errors
        ?.map((e) => {
          const rawField = e.path || e.message.match(/\.(\w+)/)?.[1] || "";
          const field = beautifyFieldName(rawField);

          let msg = e.message
            .replace(/^[A-Za-z]+\./, "")
            .replace(rawField, "")
            .replace("cannot be null", "is required")
            .replace("must be unique", "already exists")
            .trim();

          return `${field} ${msg}`.trim();
        })
        .join(", ") || error.message;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (
    error.name === "JsonWebTokenError" ||
    error.name === "TokenExpiredError" ||
    error.message === "Access token is missing"
  ) {
    statusCode = 401;
    message = error.message;
    const acceptHeader = request?.headers?.get?.("accept") || "";
    const isBrowser = acceptHeader.includes("text/html");
    // console.log(isBrowser);
    if (isBrowser) {
      const response = NextResponse.redirect(new URL("/signin", request.url));
      clearAuthCookies(response);
      return response;
    } else {
      const response = NextResponse.json(
        new ApiResponse(statusCode, null, message),
        { status: statusCode }
      );

      clearAuthCookies(response);
      return response;
    }
  }
  // else if (error.name === "SequelizeDatabaseError"){}
  console.error("Internal server error:", error);
  return NextResponse.json(new ApiResponse(statusCode, null, message), {
    status: statusCode,
  });
};
