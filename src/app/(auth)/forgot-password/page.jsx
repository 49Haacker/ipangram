import React, { Suspense } from "react";
import ForgotPasswordContent from "./ForgotPasswordContent";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";

const page = () => {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <ForgotPasswordContent />
      </Suspense>
    </>
  );
};

export default page;
