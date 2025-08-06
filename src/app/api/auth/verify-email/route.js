import { dbConnect } from "@/backend/db/dbConnect";
import User from "@/backend/models/Users.models";
import { ApiResponse } from "@/utils/ApiResponse";
import { handleApiError } from "@/utils/handleApiError";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

dbConnect();

const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await User.findOne({
      where: {
        verify_token: token,
        verify_token_expiry: { [Op.gt]: new Date() },
      },
    });
    if (!user) {
      return NextResponse.json(
        new ApiResponse(400, null, "Invalid or expired token"),
        { status: 400 }
      );
    }

    user.is_verified = true;
    user.verify_token = null;
    user.verify_token_expiry = null;
    await user.save();

    return NextResponse.json(
      new ApiResponse(200, null, "Email verified successfully."),
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, request);
  }
};

export { POST };
