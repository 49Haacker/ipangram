import "@/utils/associations";

import { dbConnect } from "@/backend/db/dbConnect";
import { ApiResponse } from "@/utils/ApiResponse";
import { authHandler } from "@/utils/authHandler";
import { handleApiError } from "@/utils/handleApiError";
import { NextResponse } from "next/server";

await dbConnect();

const GET = authHandler(async (request, context, currentUser) => {
  try {
    const responseData = { task: null };

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
