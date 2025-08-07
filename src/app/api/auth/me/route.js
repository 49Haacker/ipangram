import { dbConnect } from "@/backend/db/dbConnect";
import User from "@/backend/models/user.models";
import { ApiResponse } from "@/utils/ApiResponse";
import { authHandler } from "@/utils/authHandler";
import { handleApiError } from "@/utils/handleApiError";
import { NextResponse } from "next/server";

await dbConnect();

const GET = authHandler(async (request, context, currentUser) => {
  try {
    const existingUser = await User.findOne({
      attributes: {
        exclude: [
          "password",
          "refresh_token",
          "refresh_token_expires",
          "createdAt",
          "updatedAt",
        ],
      },
      where: { id: currentUser.id },
      raw: true,
    });
    // console.log(existingUser);

    const responseData = { user: existingUser };

    return NextResponse.json(
      new ApiResponse(
        200,
        responseData,
        "Successfully fetched current user profile"
      )
    );
  } catch (error) {
    // console.log(error.name);
    return handleApiError(error, request);
  }
});

export { GET };
