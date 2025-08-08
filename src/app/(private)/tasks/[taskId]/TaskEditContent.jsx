"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTask } from "@/lib/api";
import { cn } from "@/lib/utils";
import { updateTaskSchema } from "@/schemas/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const TaskEditContent = ({ taskId, task }) => {
  // console.log("taskId, task", taskId, task);
  const router = useRouter();

  const updateTaskForm = useForm({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.due_date,
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (payload) => updateTask(payload),
    onMutate: () => {
      toast.loading("Updating task...", { id: "updateTask-toast" });
    },
    onSuccess: (res) => {
      toast.success(`${res.message}`, { id: "updateTask-toast" });
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message || "Updating task failed", {
        id: "updateTask-toast",
      });
    },
  });

  const handleUpdateTask = (values) => {
    const payload = {
      taskInfo: {
        title: values.title,
        description: values.description,
        priority: values.priority,
        status: values.status,
        dueDate: values.dueDate,
      },
      taskId,
    };

    updateTaskMutation.mutate(payload);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <span className="text-4xl border-b-2 border-accent text-primary">
        Edit Task
      </span>

      <div className="w-full md:w-1/2 space-y-1">
        <Form {...updateTaskForm}>
          <form
            onSubmit={updateTaskForm.handleSubmit(handleUpdateTask)}
            className="space-y-4"
          >
            <div className="flex items-center gap-1">
              <FormField
                control={updateTaskForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateTaskForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Write description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-1">
              <FormField
                control={updateTaskForm.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateTaskForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={updateTaskForm.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant={"outline"}>
              Update Task
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TaskEditContent;
