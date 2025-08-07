"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const NavbarTab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-primary md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

export const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-accent md:h-12"
    />
  );
};

export const CompanyLogo = ({ classes = "", imageClasses = "" }) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "relative w-[123px] h-[43px] shadow-accent drop-shadow-xs drop-shadow-accent",
        classes
      )}
    >
      <span className="text-2xl">Task</span>
    </Link>
  );
};
