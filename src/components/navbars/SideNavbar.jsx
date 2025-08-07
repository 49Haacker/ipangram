import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlignRight } from "lucide-react";
import Link from "next/link";
import { navbars } from "@/data/nabars";

const SideNavbar = () => {
  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <AlignRight />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className={`text-xl text-primary`}>Task</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <div className="flex justify-center items-center flex-col gap-4">
              {navbars.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex flex-col gap-2"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default SideNavbar;
