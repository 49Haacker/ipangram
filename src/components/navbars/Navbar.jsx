"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cursor, NavbarTab } from "./NavbarTab";
import UserProfile from "../users/UserProfile";
import SideNavbar from "./SideNavbar";
import { navbars } from "@/data/nabars";

const Navbar = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <>
      <div className="w-full px-4 py-4">
        <ul
          onMouseLeave={() => {
            setPosition((pv) => ({
              ...pv,
              opacity: 0,
            }));
          }}
          className="relative w-full rounded-full border-2 border-accent shadow-md bg-background px-4 py-0.5 flex items-center justify-between"
        >
          <span className="text-2xl text-primary hidden md:block drop-shadow-none">
            Tasks
          </span>
          <SideNavbar />

          <div className="hidden md:flex items-center">
            {navbars.map((item, index) => (
              <Link key={index} href={item.href}>
                <NavbarTab setPosition={setPosition}>{item.name}</NavbarTab>
              </Link>
            ))}
            <Cursor position={position} />
          </div>

          <UserProfile />
        </ul>
      </div>
    </>
  );
};

export default Navbar;
