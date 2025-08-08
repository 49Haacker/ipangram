import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/db/dbConnect";
import { authHandler } from "@/utils/authHandler";
import Task from "@/backend/models/task.models";
import { ApiResponse } from "@/utils/ApiResponse";
import { handleApiError } from "@/utils/handleApiError";
import { taskFormSchema, updateTaskSchema } from "@/schemas/taskSchema";

dbConnect();

export const GET = authHandler(async (request, context, currentUser) => {
  try {
    const { taskId } = await context.params;
    // console.log("taskId",taskId);
    if (!taskId) {
      return NextResponse.json(
        new ApiResponse(400, null, "task-id is required"),
        { status: 400 }
      );
    }

    const existingTask = await Task.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { id: taskId },
      raw: true,
    });

    // console.log(existingTask);
    const responseData = {
      task: existingTask,
    };

    return NextResponse.json(
      new ApiResponse(200, responseData, "Successfully retrived task details.")
    );
  } catch (error) {
    return handleApiError(error);
  }
});

export const PATCH = authHandler(async (request, context, currentUser) => {
  try {
    const { taskId } = await context.params;
    // console.log("taskId", taskId);
    if (!taskId) {
      return NextResponse.json(
        new ApiResponse(400, null, "Task-id is required"),
        { status: 400 }
      );
    }
    const reqBody = await request.json();
    // console.log(reqBody);
    const { taskInfo } = reqBody;
    // console.log(taskInfo);

    const parsed = updateTaskSchema.safeParse(reqBody.taskInfo);
    if (!parsed.success) {
      const fieldErrors = parsed.error.errors.map((err) => {
        const field = err.path.join(" ").replace(/([A-Z])/g, " $1");
        return `${field.charAt(0).toUpperCase() + field.slice(1)}: ${
          err.message
        }`;
      });
      const mergedMessage = fieldErrors.join(", ");

      return NextResponse.json(
        new ApiResponse(400, "Validation failed", mergedMessage),
        { status: 400 }
      );
    }
    // if (currentUser.role !== "admin") {
    //   return NextResponse.json(
    //     new ApiResponse(
    //       403,
    //       null,
    //       "Unauthorized access: This resource is only available to admin users."
    //     ),
    //     { status: 403 }
    //   );
    // }
    const existingTask = await Task.findOne({
      attributes: ["id", "user_id_fk", "title"],
      where: { id: taskId },
      raw: true,
    });
    // console.log("existingTask", existingTask);
    if (!existingTask) {
      return NextResponse.json(
        new ApiResponse(404, null, "Task detail not found."),
        { status: 404 }
      );
    }
    await Task.update(
      {
        title: taskInfo.title,
        description: taskInfo.description,
        priority: taskInfo.priority,
        status: taskInfo.status,
        due_date: new Date(taskInfo.dueDate),
      },
      { where: { id: existingTask.id } }
    );

    return NextResponse.json(
      new ApiResponse(200, null, "Successfully updated task details.")
    );
  } catch (error) {
    return handleApiError(error);
  }
});

export const DELETE = authHandler(async (request, context, currentUser) => {
  try {
    const { taskId } = await context.params;
    console.log("taskId", taskId);
    if (!taskId) {
      return NextResponse.json(
        new ApiResponse(400, null, "Task Id is required"),
        { status: 400 }
      );
    }

    const existingTask = await Task.findOne({
      attributes: ["id", "user_id_fk", "title"],
      where: { id: taskId },
      raw: true,
    });
    if (!existingTask) {
      return NextResponse.json(
        new ApiResponse(404, null, "Task not found with the provided ID."),
        { status: 404 }
      );
    }
    await Task.destroy({
      where: { id: taskId },
    });

    return NextResponse.json(
      new ApiResponse(200, null, "task was deleted successfully.")
    );
  } catch (error) {
    return handleApiError(error);
  }
});
