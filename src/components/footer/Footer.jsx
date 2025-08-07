import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";
// import CompanyName from "../animations/CompanyName";

const Footer = () => {
  return (
    <footer className="bg-primary-foreground py-1 px-4 md:px-12 mt-10 border-t text-center flex flex-wrap justify-center md:justify-between items-center gap-4">
      <span className="text-xl text-primary">task</span>
      <span className="text-center text-xs text-muted-accent font-bold flex items-center gap-0.5">
        <span>© 2025</span>
        <span className="md:text-sm text-primary">task</span>
        <span>All rights reserved.</span>
      </span>
      <div className="flex items-center gap-4">
        <Link href="" className="text-primary hover:text-accent/90 transition">
          <Instagram className="h-5 w-5" />
        </Link>
        <Link href="" className="text-primary hover:text-accent/90 transition">
          <Facebook className="h-5 w-5" />
        </Link>
        <Link href="" className="text-primary hover:text-accent/90 transition">
          <Linkedin className="h-5 w-5" />
        </Link>
        <Link href="" className="text-primary hover:text-accent/90 transition">
          <Twitter className="h-5 w-5" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
