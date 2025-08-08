import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbars/Navbar";
import React from "react";

export default function PrivateLayout({ children }) {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col gap-8">
        {/* <div></div> */}
        <Navbar />
        <main className="flex-1 px-4 pt-24">{children}</main>
        <Footer />
      </div>
    </>
  );
}
