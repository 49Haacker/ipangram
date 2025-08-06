import { dbConnect } from "@/backend/db/dbConnect";
import User from "@/backend/models/Users.models";
import { ApiResponse } from "@/utils/ApiResponse";
import { clearAuthCookies, verifyAccessToken } from "@/utils/authUtils";
import { handleApiError } from "@/utils/handleApiError";
import { NextResponse } from "next/server";

await dbConnect();

const GET = async (request) => {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;
    // console.log(accessToken);
    if (!accessToken) {
      return NextResponse.json(
        new ApiResponse(
          200,
          { alreadyLoggedOut: true },
          "User already logged out"
        ),
        { status: 200 }
      );
    }
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      const response = NextResponse.json(
        new ApiResponse(401, null, "Access token is invalid or expired"),
        { status: 401 }
      );
      clearAuthCookies(response);
      return response;
    }
    const user = await User.findByPk(decoded.userId);
    if (user) {
      user.refreshToken = null;
      user.refreshTokenExpires = null;
      await user.save();
    }

    const response = NextResponse.json(
      new ApiResponse(200, null, "Logout successful"),
      { status: 200 }
    );
    clearAuthCookies(response);

    return response;
  } catch (error) {
    return handleApiError(error, request);
  }
};

export { GET };
