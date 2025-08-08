"use client";
import React, { Suspense } from "react";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import { TaskContextProvider } from "@/context/TaskContext";
import TaskEditContent from "./TaskEditContent";
import { useQuery } from "@tanstack/react-query";
import { getSingleTaskDetail } from "@/lib/api";
import ErrorSkeleton from "@/components/skeleton/ErrorSkeleton";
import { useParams, useSearchParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const taskId = params.taskId;
  // console.log(taskId);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getSingleTaskDetail", taskId],
    queryFn: () => getSingleTaskDetail(taskId),
  });
  // console.log("data", data);

  if (isError) {
    return (
      <ErrorSkeleton
        message="Failed to load franchise single client details."
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading || !data) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <TaskContextProvider>
          <TaskEditContent taskId={taskId} task={data?.task} />
        </TaskContextProvider>
      </Suspense>
    </>
  );
};

export default page;
