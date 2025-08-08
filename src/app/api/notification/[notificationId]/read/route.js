import "@/utils/associations";

import { dbConnect } from "@/backend/db/dbConnect";
import { ApiResponse } from "@/utils/ApiResponse";
import { authHandler } from "@/utils/authHandler";
import { handleApiError } from "@/utils/handleApiError";
import { NextResponse } from "next/server";

import Notification from "@/backend/models/notification.models";

await dbConnect();

export const PATCH = authHandler(async (request, context, currentUser) => {
  try {
    const { notificationId } = await context.params;
    const { read } = await request.json();
    // console.log("notificationId", notificationId);
    // console.log("read", read);

    if (typeof read !== "boolean") {
      return NextResponse.json(
        new ApiResponse(400, null, "`read` field must be true or false")
      );
    }

    const notification = await Notification.findOne({
      where: { id: notificationId, user_id_fk: currentUser.id },
    });
    // console.log("notification", notification);
    if (!notification) {
      return NextResponse.json(
        new ApiResponse(404, null, "Notification not found")
      );
    }

    notification.read = read;
    await notification.save();

    return NextResponse.json(
      new ApiResponse(
        200,
        { notification },
        `Notification marked as ${read ? "read" : "unread"}`
      )
    );
  } catch (error) {
    return handleApiError(error, request);
  }
});
