import { dbConnect } from "@/backend/db/dbConnect";
import User from "@/backend/models/Users.models";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { handleApiError } from "@/utils/handleApiError";
import { NextResponse } from "next/server";
import { Op } from "sequelize";
import ms from "ms";

await dbConnect();

const generateAccessAndRefreshTokens = async (user_id) => {
  try {
    const currentUser = await User.findByPk(user_id);
    if (!currentUser) {
      return NextResponse.json(new ApiResponse(404, null, "User not found"), {
        status: 404,
      });
    }
    const AccessToken = currentUser.generateAccessToken();
    const RefreshToken = currentUser.generateRefreshToken();
    // console.log("AccessToken", AccessToken);
    // console.log("RefreshToken", RefreshToken);

    currentUser.refresh_token = RefreshToken;
    const expiry = ms(process.env.REFRESH_TOKEN_EXPIRY);
    currentUser.refresh_token_expires = new Date(Date.now() + expiry);

    await currentUser.save({ validateBeforeSave: true });

    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(500, "Token generation failed: " + error.message);
  }
};

const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { identifier, password } = reqBody;
    if (!(identifier && password)) {
      return NextResponse.json(
        new ApiResponse(400, null, "All fields are required"),
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        [Op.or]: [
          identifier && { user_name: identifier.toLowerCase() },
          identifier && { email: identifier.toLowerCase() },
        ].filter(Boolean),
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        new ApiResponse(404, null, "User does not exist"),
        { status: 404 }
      );
    }
    // Check if the email is verified
    if (!existingUser.is_verified) {
      return NextResponse.json(
        new ApiResponse(400, null, "Email not verified"),
        { status: 400 }
      );
    }
    const isPasswordValid = await existingUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        new ApiResponse(400, null, "Invalid User credentials"),
        { status: 400 }
      );
    }
    const { AccessToken, RefreshToken } = await generateAccessAndRefreshTokens(
      existingUser.id
    );

    const isProd = process.env.NODE_ENV === "production";
    // console.log("from login", process.env.NODE_ENV);
    const options = {
      httpOnly: true,
      // secure: true,
      // secure: isProd,
      // sameSite: isProd ? "none" : "lax",
      secure: false,
      sameSite: "lax",
      // sameSite: "Strict",
      path: "/",
      // maxAge: 24 * 60 * 60 * 1000, // Set max age for cookies, e.g., 1 day
    };

    const userData = {
      id: existingUser.id,
      user_name: existingUser.user_name,
      name: existingUser.name,
      role: existingUser.role,
      email: existingUser.email,
      status: existingUser.status,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    };

    const responseData = { user: userData, AccessToken, RefreshToken };

    const response = NextResponse.json(
      new ApiResponse(200, responseData, "User login successfully."),
      { status: 200 }
    );
    response.cookies.set("accessToken", AccessToken, options);
    response.cookies.set("refreshToken", RefreshToken, options);

    return response;
  } catch (error) {
    // const statusCode = error instanceof ApiError ? error.statusCode : 500;
    // const message =
    //   error instanceof ApiError ? error.message : "Internal Server Error";
    // console.log("Internal server accoured:", error);
    // return NextResponse.json(new ApiResponse(statusCode, null, message), {
    //   status: statusCode,
    // });
    return handleApiError(error, request);
  }
};

export { POST };
