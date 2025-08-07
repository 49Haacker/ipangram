"use client";

import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import AuthContext from "@/context/AuthContext";
import InputPassword from "@/components/ui/InputPassword";

const SignInContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlIdentifier = searchParams.get("identifier") || "";
  const { signinForm } = useContext(AuthContext);

  useEffect(() => {
    if (urlIdentifier) {
      signinForm.setValue("identifier", urlIdentifier);
    }
  }, [urlIdentifier, signinForm]);

  const loginMutation = useMutation({
    mutationFn: (payload) => loginUser(payload),
    onMutate: () => {
      toast.loading("Logging in...", { id: "login-toast" });
    },
    onSuccess: (res) => {
      // console.log("res", res);
      toast.success(`Hey 👋, ${res.message}`, { id: "login-toast" });
      router.push("/");
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: res.data.user?.id,
          userName: res.data.user?.user_name,
          role: res.data.user?.role,
          documentLink: res?.data.user?.document_link,
        })
      );
      window.dispatchEvent(new Event("userInfoChanged"));
    },
    onError: (error) => {
      toast.error(error.message || "Login failed", { id: "login-toast" });
    },
  });

  const handleSignin = async (values) => {
    const payload = {
      identifier: values.identifier,
      password: values.password,
    };
    loginMutation.mutate(payload);
  };

  return (
    <>
      <div className="space-y-1">
        <Form {...signinForm}>
          <form
            onSubmit={signinForm.handleSubmit(handleSignin)}
            className="space-y-4"
          >
            <FormField
              control={signinForm.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input placeholder="exapple@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signinForm.control}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Checkbox id="terms" className={`size-3 sm:size-4`} />
                <Label
                  htmlFor="terms"
                  className={`text-primary dark:text-accent text-[12px]`}
                >
                  Accept terms and conditions
                </Label>
              </div>
              <Link
                href={"/forgot-password"}
                className="text-[12px] text-primary dark:text-accent font-bold hover:underline cursor-pointer"
              >
                forgot password ?
              </Link>
            </div>

            <Button
              type="submit"
              variant={"outline"}
              size={"md"}
              className="w-full text-primary text-[18px] font-semibold border-accent hover:bg-accent"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-[12px] flex items-center justify-center gap-1">
          Don't have an account?
          <Link
            href="/signup"
            className="text-primary dark:text-accent font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignInContent;
