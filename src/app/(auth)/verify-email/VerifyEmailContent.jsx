"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/lib/api";
import toast from "react-hot-toast";

const formSchema = z.object({
  identifier: z.string().min(3, "Enter your email or username"),
  verifyToken: z.string().min(10, "Verify Token was required"),
});

const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const userName = searchParams.get("userName");
  const verifyToken = searchParams.get("verifyToken");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: email || userName,
      verifyToken: verifyToken || "",
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (payload) => verifyEmail(payload),
    onSuccess: (res) => {
      // console.log(res.message);
      toast.success(`Hey 👋, ${res.message}`);
      router.push(`/signin?identifier=${email || userName}`);
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.message || "Email Verification failed");
    },
  });

  const handleVerifyEmail = (values) => {
    // console.log(values);
    const payload = {
      token: values.verifyToken,
    };
    verifyEmailMutation.mutate(payload);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleVerifyEmail)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter email or username"
                    disabled={!!form.getValues("identifier")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="verifyToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>verifyToken</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter email or username"
                    disabled={!!form.getValues("verifyToken")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="outline"
            size="md"
            className="w-full text-primary text-[18px] font-semibold border-accent hover:bg-accent"
            disabled={verifyEmailMutation.isPending}
          >
            {/* Verify Email */}
            {verifyEmailMutation.isPending ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default VerifyEmailContent;
