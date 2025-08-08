import z from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  priority: z.string().min(2, {
    message: "Priority must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Status must be at least 2 characters.",
  }),
  dueDate: z.preprocess(
    (val) =>
      typeof val === "string" || val instanceof Date ? new Date(val) : val,
    z.date({
      required_error: "due date is required",
    })
  ),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  priority: z.string().min(2, {
    message: "Priority must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Status must be at least 2 characters.",
  }),
  dueDate: z.preprocess(
    (val) =>
      typeof val === "string" || val instanceof Date ? new Date(val) : val,
    z.date({
      required_error: "due date is required",
    })
  ),
});
