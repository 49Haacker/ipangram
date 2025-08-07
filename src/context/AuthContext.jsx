"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AuthContext = createContext();

const signupFormSchema = z
  .object({
    username: z.string().min(1, "Username is too short").max(50),
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    role: z.string().min(2, "Role is required"),
    status: z.string().min(5, "Status must be at least 5 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const signinFormSchema = z.object({
  identifier: z.string().min(1, "Enter your email or username"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const AuthContextProvider = ({ children }) => {
  const signupForm = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "admin",
      status: "active",
    },
    mode: "onChange",
  });

  const signinForm = useForm({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onChange",
  });

  const resetSignupForm = () => {
    signupForm.reset({
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "admin",
      status: "active",
    });
  };

  return (
    <AuthContext.Provider value={{ signupForm, signinForm, resetSignupForm }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
