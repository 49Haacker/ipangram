"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContextProvider } from "@/context/AuthContext";
import Image from "next/image";

export default function AuthLayout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="border border-accent/85 flex max-w-sm md:max-w-2xl lg:max-w-4xl w-full h-[80%] shadow-lg shadow-accent rounded-lg overflow-hidden">
          {/* Left Side Image */}
          <div className="w-1/2 h-[450px] hidden md:block overflow-hidden relative">
            <Image
              src="/assets/auth/authLayout.svg"
              alt="Auth Illustration"
              fill
              className="object-fill"
            />
          </div>

          <div className="w-full md:w-1/2 max-h-screen px-3 flex flex-col items-center justify-center">
            <span>Tasks</span>

            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{
                  x: pathname === "/signin" ? 100 : -100,
                  opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: pathname === "/signin" ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full py-8"
              >
                <AuthContextProvider>{children}</AuthContextProvider>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
