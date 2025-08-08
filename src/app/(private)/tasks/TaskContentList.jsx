"use client";
import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTaskList, getTaskLists } from "@/lib/api";
import ErrorSkeleton from "@/components/skeleton/ErrorSkeleton";
import { filterData } from "@/helpers/reuseData";
import PaginationComponent from "@/helpers/PaginationComponent";
import SearchInput from "@/helpers/SearchInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterBar from "@/utils/FilterBar";
import toast from "react-hot-toast";
import Link from "next/link";

const TaskContentList = () => {
  const [pageLimit, setPageLimit] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getTaskLists", currentPage, pageLimit, searchTerm],
    queryFn: () => getTaskLists(currentPage, pageLimit, searchTerm),
    retry: false,
  });
  //   console.log("data", data);

  const filteredData = filterData(data?.tasks || [], searchTerm);
  const pagination = data?.pagination || { totalPages: 1 };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const deleteTaskDetailMutation = useMutation({
    mutationFn: (taskId) => deleteTaskList(taskId),
    onMutate: () => {
      toast.loading("Deleting...", { id: "delete-task-toast" });
    },
    onSuccess: (res) => {
      // console.log(res.message);
      toast.success(`Hey 👋, ${res.message}`, { id: "delete-task-toast" });
      Swal.fire({
        title: "Deleted!",
        text: "Tasks has been deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["getTaskLists"]);
      queryClient.invalidateQueries(["getNotifications"]);
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.message || "Deleting task failed", {
        id: "delete-task-toast",
      });
    },
  });

  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTaskDetailMutation.mutate(taskId.id);
      }
    });
  };

  if (isError) {
    return <ErrorSkeleton message={error.message} onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col">
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
        pageLimit={pageLimit}
        onLimitChange={setPageLimit}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-neutral-900 shadow-md rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {item.title}
            </h2>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 flex-1">
              {item.description}
            </p>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : item.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.status}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : item.priority === "Medium"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {item.priority}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              <Link
                href={`/tasks/${item.id}`}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Pencil size={16} /> Edit
              </Link>
              <button
                onClick={() => handleDeleteTask(item)}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <PaginationComponent
        currentDataCount={filteredData?.length}
        totalRecords={data?.pagination?.totalRecords}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TaskContentList;
