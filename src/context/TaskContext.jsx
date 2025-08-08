"use client";
import { taskFormSchema, updateTaskSchema } from "@/schemas/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useContext } from "react";
import { useForm } from "react-hook-form";

const TaskContext = createContext(null);

export const TaskContextProvider = ({ children }) => {
  const taskForm = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      status: "",
      dueDate: new Date(),
    },
    mode: "onChange",
  });

  const handleResetTask = () => {
    taskForm.reset({
      title: "",
      description: "",
      priority: "",
      status: "",
      dueDate: new Date(),
    });
  };

  return (
    <TaskContext.Provider value={{ taskFormSchema, taskForm, handleResetTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// export default TaskContext;
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
}
