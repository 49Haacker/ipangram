import { dbConnect } from "@/backend/db/dbConnect";
import User from "@/backend/models/user.models";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import ms from "ms";
import { handleApiError } from "@/utils/handleApiError";
import { Op } from "sequelize";
import Notification from "@/backend/models/notification.models";

dbConnect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { identifier, password, confirmPassword } = reqBody;
    // console.log(reqBody);
    if (!identifier || !password || !confirmPassword) {
      return NextResponse.json(
        new ApiResponse(400, null, "All fields are required"),
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        new ApiResponse(
          422,
          null,
          "Passwords do not match. Please ensure both fields contain the same value.",
          "ERR_PASSWORD_MISMATCH"
        ),
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { user_name: identifier.toLowerCase() },
          { email: identifier.toLowerCase() },
        ],
      },
    });
    // console.log(existingUser);
    if (!existingUser) {
      return NextResponse.json(
        new ApiResponse(404, null, "Username or email not found"),
        { status: 404 }
      );
    }
    // Generate verification token and expiry (1 hour validity)
    const verifyToken = process.env.VERIFY_TOKEN_SECRET;
    const hashedToken = await bcryptjs.hash(verifyToken, 10);
    const verifyExpiryMs = ms(process.env.VERIFY_TOKEN_EXPIRY);
    const verifyTokenExpiry = new Date(Date.now() + verifyExpiryMs);

    existingUser.password = password;
    existingUser.verify_token = hashedToken;
    existingUser.verify_token_expiry = verifyTokenExpiry;
    await existingUser.save();

    const updatedUser = {
      email: existingUser.email,
      userName: existingUser.user_name,
      verifyToken: existingUser.verify_token,
      verifyTokenExpiry: existingUser.verify_token_expiry,
    };

    await Notification.create({
      user_id_fk: existingUser.id,
      message: `Password was reseted: ${existingUser.user_name}`,
      type: "task",
    });

    return NextResponse.json(
      new ApiResponse(200, updatedUser, "Passowrd was generated successfully."),
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, request);
  }
};
