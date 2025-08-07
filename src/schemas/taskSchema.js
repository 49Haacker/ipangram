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
  dueDate: z.union([
    z.string().min(2, { message: "Due date must be at least 2 characters." }),
    z.date(),
  ]),
});
