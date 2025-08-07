"use client";

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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputPassword from "@/components/ui/InputPassword";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const SignupContent = () => {
  const router = useRouter();
  const { signupForm, resetSignupForm } = useContext(AuthContext);

  const createUserMutation = useMutation({
    mutationFn: (payload) => createUser(payload),
    onMutate: () => {
      toast.loading("Creating user...", { id: "createUser-toast" });
    },
    onSuccess: (res) => {
      // console.log(res);
      toast.success(`Hey 👋, ${res.message}`, { id: "createUser-toast" });
      resetSignupForm();
      router.push(
        `/verify-email?email=${res?.data.email}&userName=${res?.data.userName}&verifyToken=${res?.data.verifyToken}`
      );
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.message || "Creating user failed", {
        id: "createUser-toast",
      });
    },
  });

  const handleCreateUser = async (values) => {
    const payload = {
      email: values.email,
      username: values.username,
      name: values.name,
      password: values.password,
      confirmPassword: values.confirmPassword,
      role: values.role,
      status: values.status,
    };
    createUserMutation.mutate(payload);
  };

  return (
    <div className="w-full space-y-1">
      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(handleCreateUser)}
          className="space-y-4"
        >
          <div className="flex items-center gap-1">
            <FormField
              control={signupForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="yourusername" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="franchise">Franchise</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-1">
            <FormField
              control={signupForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-1">
            <FormField
              control={signupForm.control}
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
              control={signupForm.control}
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
          </div>

          <Button
            type="submit"
            variant={"outline"}
            size={"md"}
            className="w-full text-primary text-[18px] font-semibold border-accent hover:bg-accent"
          >
            {createUserMutation.isPending ? "Creating...." : "Create Account"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-[12px] flex items-center justify-center gap-1">
        Already have an account?
        <Link
          href="/signin"
          className="text-accent font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignupContent;
