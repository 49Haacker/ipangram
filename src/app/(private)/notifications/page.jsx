import React, { Suspense } from "react";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";

import NotificationsContent from "./NotificationsContent";

const page = () => {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <NotificationsContent />
      </Suspense>
    </>
  );
};

export default page;
