import React, { Suspense } from "react";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import ForgotPasswordContent from "./ForgotPasswordContent";

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
