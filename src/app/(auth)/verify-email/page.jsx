import React, { Suspense } from "react";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import VerifyEmailContent from "./VerifyEmailContent";

const page = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default page;
