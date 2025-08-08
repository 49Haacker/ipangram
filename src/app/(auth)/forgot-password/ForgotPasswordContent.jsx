"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/ui/InputPassword";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/api";

const formSchema = z.object({
  identifier: z.string().min(1, "Enter your email or username"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const ForgotPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const identifier = searchParams.get("identifier");
  // console.log(identifier);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: identifier || "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const forgerPasswordMutation = useMutation({
    mutationFn: (payload) => forgotPassword(payload),
    onMutate: () => {
      toast.loading("Generating pass...", { id: "forgot-toast" });
    },
    onSuccess: (res) => {
      toast.success(`Hey 👋, ${res.message}`, { id: "forgot-toast" });
      resetForgotPassword();
      queryClient.invalidateQueries(["getNotifications"]);
      router.push(
        `/verify-email?email=${res?.data.email}&userName=${res?.data.userName}&verifyToken=${res?.data.verifyToken}`
      );
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.message || "forgot password failed", {
        id: "forgot-toast",
      });
    },
  });

  const handleSignin = (values) => {
    const payload = {
      identifier: values.identifier,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    forgerPasswordMutation.mutate(payload);
  };

  const resetForgotPassword = () => {
    form.reset({
      identifier: identifier || "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignin)} className="space-y-4">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter email or username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword
                    placeholder="XXXXXXXX"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <InputPassword
                    placeholder="XXXXXXXX"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="outline"
            size="md"
            className="w-full text-primary text-[18px] font-semibold border-accent hover:bg-accent"
          >
            {forgerPasswordMutation.isPending
              ? "Generating....."
              : "Generate Password"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ForgotPasswordContent;
