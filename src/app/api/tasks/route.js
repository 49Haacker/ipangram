import "@/utils/associations";

import { dbConnect } from "@/backend/db/dbConnect";
import { ApiResponse } from "@/utils/ApiResponse";
import { authHandler } from "@/utils/authHandler";
import { handleApiError } from "@/utils/handleApiError";
import { NextResponse } from "next/server";
import { getPaginationParams } from "@/utils/pagination";

import Task from "@/backend/models/task.models";
import User from "@/backend/models/user.models";

await dbConnect();

export const POST = authHandler(async (request, context, currentUser) => {
  try {
    const reqBody = await request.json();
    // console.log(reqBody);
    const { task } = reqBody;

    if (
      !task.title ||
      !task.description ||
      !task.priority ||
      !task.status ||
      !task.dueDate
    ) {
      return NextResponse.json(
        new ApiResponse(400, null, "All fields are required"),
        { status: 400 }
      );
    }
    const allowedPriorities = ["High", "Medium", "Low"];
    const allowedStatuses = ["Pending", "In Progress", "Completed", "Overdue"];
    if (!allowedPriorities.includes(task.priority)) {
      return NextResponse.json(
        new ApiResponse(
          400,
          null,
          `Invalid priority. Allowed values: ${allowedPriorities.join(", ")}`
        ),
        { status: 400 }
      );
    }
    if (!allowedStatuses.includes(task.status)) {
      return NextResponse.json(
        new ApiResponse(
          400,
          null,
          `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`
        ),
        { status: 400 }
      );
    }

    Task.create({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      due_date: new Date(task.dueDate),
      user_id_fk: currentUser.id,
    });

    return NextResponse.json(
      new ApiResponse(200, null, "Successfully added task")
    );
  } catch (error) {
    // console.log(error.name);
    return handleApiError(error, request);
  }
});

export const GET = authHandler(async (request, context, currentUser) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { page, limit, offset, All, search } =
      getPaginationParams(searchParams);

    if (currentUser.role === "user") {
      return NextResponse.json(
        new ApiResponse(
          403,
          null,
          "Unauthorized access: This resource is only available to admin and users."
        ),
        { status: 403 }
      );
    }

    const existingTask = await Task.findAll({
      attributes: ["id", "user_id_fk", "title", "description"],
      include: [{ model: User, required: true, attributes: [] }],
      raw: true,
    });

    console.log(existingTask);

    return NextResponse.json(
      new ApiResponse(200, null, "Successfully retriving task")
    );
  } catch (error) {
    // console.log(error.name);
    return handleApiError(error, request);
  }
});
