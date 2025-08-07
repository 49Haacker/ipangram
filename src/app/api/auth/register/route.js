import { dbConnect } from "@/backend/db/dbConnect";
import User from "@/backend/models/user.models";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextResponse } from "next/server";
import { Op } from "sequelize";
import bcryptjs from "bcryptjs";
import ms from "ms";
import { handleApiError } from "@/utils/handleApiError";

await dbConnect();

const POST = async (request) => {
  try {
    const reqBody = await request.json();
    // console.log(reqBody);
    const { username, name, email, password, confirmPassword, role, status } =
      reqBody;
    // console.log(username, email, password);
    if (!username || !name || !email || !password || !confirmPassword) {
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
          { user_name: username.toLowerCase() },
          { email: email.toLowerCase() },
        ],
      },
    });
    // console.log("existingUser", existingUser);
    if (existingUser) {
      return NextResponse.json(
        new ApiResponse(409, null, "Username or email already taken"),
        { status: 409 }
      );
    }

    // Generate verification token and expiry (1 hour validity)
    const verifyToken = process.env.VERIFY_TOKEN_SECRET;
    const hashedToken = await bcryptjs.hash(verifyToken, 10);
    const verifyExpiryMs = ms(process.env.VERIFY_TOKEN_EXPIRY);
    const verifyTokenExpiry = new Date(Date.now() + verifyExpiryMs);
    // console.log("verifyToken", verifyToken);
    // console.log("hashedToken", hashedToken);
    // console.log("verifyExpiryMs", verifyExpiryMs);
    // console.log("verifyTokenExpiry", verifyTokenExpiry);
    const createdUser = await User.create({
      user_name: username.toLowerCase(),
      name: formatFullName(name),
      email: email.toLowerCase(),
      password: password,
      role: role,
      status: status,
      verify_token: hashedToken,
      verify_token_expiry: verifyTokenExpiry,
    });
    // await sendEmail({ email, emailType: "VERIFY", userId: createdUser.userId });
    const savedUser = {
      userName: createdUser.user_name,
      name: createdUser.name,
      email: createdUser.email,
      password: createdUser.password,
      role: createdUser.role,
      status: createdUser.status || "active",
      verifyToken: createdUser.verify_token,
      verifyTokenExpiry: createdUser.verify_token_expiry,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };

    return NextResponse.json(
      new ApiResponse(200, savedUser, "User registered successfully."),
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error, request);
  }
};

export { POST };

export const formatFullName = (name) => {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};
