"use client";

import React, { forwardRef, useState } from "react";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const InputPassword = forwardRef(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        ref={ref}
        className={cn("pr-10", className)}
        {...props}
      />
      <span
        onClick={toggleVisibility}
        className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </span>
    </div>
  );
});

InputPassword.displayName = "InputPassword";

export default InputPassword;
