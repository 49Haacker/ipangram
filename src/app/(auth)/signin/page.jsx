import React, { Suspense } from "react";
import SignInContent from "./SignInContent";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";

const page = () => {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <SignInContent />
      </Suspense>
    </>
  );
};

export default page;
