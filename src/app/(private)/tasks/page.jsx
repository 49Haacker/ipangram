import React, { Suspense } from "react";
import TaskContent from "./TaskContent";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import { TaskContextProvider } from "@/context/TaskContext";

const page = () => {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <TaskContextProvider>
          <TaskContent />
        </TaskContextProvider>
      </Suspense>
    </>
  );
};

export default page;
