import "@/utils/associations";

import { dbConnect } from "@/backend/db/dbConnect";
import { ApiResponse } from "@/utils/ApiResponse";
import { authHandler } from "@/utils/authHandler";
import { handleApiError } from "@/utils/handleApiError";
import { NextResponse } from "next/server";

import Task from "@/backend/models/task.models";
import User from "@/backend/models/user.models";
import { Op } from "sequelize";
import Notification from "@/backend/models/notification.models";

await dbConnect();

export const GET = authHandler(async (request, context, currentUser) => {
  try {
    const notifications = await Notification.findAll({
      attributes: ["id", "user_id_fk", "task_id_fk", "type", "message", "read"],
      // include: [
      //   { model: User, required: true, attributes: [] },
      //   { model: Task, required: true, attributes: [] },
      // ],
      order: [
        ["read", "ASC"],
        ["createdAt", "DESC"],
      ],
      raw: true,
    });
    // console.log(notifications);

    const responseData = { notifications: notifications };

    return NextResponse.json(
      new ApiResponse(
        200,
        responseData,
        "Successfully retriving task notification"
      )
    );
  } catch (error) {
    return handleApiError(error, request);
  }
});
