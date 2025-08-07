import React, { Suspense } from "react";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import SignupContent from "./SignupContent";

const page = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SignupContent />
    </Suspense>
  );
};

export default page;
