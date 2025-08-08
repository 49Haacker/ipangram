"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Check } from "lucide-react";
import toast from "react-hot-toast";

import { getNotifications, markasReadingNotification } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import ErrorSkeleton from "@/components/skeleton/ErrorSkeleton";

dayjs.extend(relativeTime);

const NotificationsContent = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: getNotifications,
  });

  const mutation = useMutation({
    mutationFn: markasReadingNotification,
    onMutate: () => {
      toast.loading("Updating notification...", {
        id: "notification-toast",
      });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Updated!", {
        id: "notification-toast",
      });
      queryClient.invalidateQueries(["getNotifications"]);
    },
    onError: (err) => {
      toast.error(err?.message || "Something went wrong", {
        id: "notification-toast",
      });
    },
  });

  const toggleReadStatus = (notification) => {
    const payload = {
      notificationId: notification.id,
      read: !notification.read,
    };
    mutation.mutate(payload);
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError)
    return <ErrorSkeleton message={error?.message} onRetry={refetch} />;

  const notifications = data?.notifications || [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-primary dark:text-accent">
        🔔 All Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>No notifications found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between items-start px-4 py-3 rounded-md border shadow-sm ${
                item.read ? "bg-muted/30" : "bg-background"
              }`}
            >
              <div className="flex-1 pr-4">
                <p className="font-medium text-primary">{item.message}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {dayjs(item.createdAt).fromNow()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  onClick={() => toggleReadStatus(item)}
                  className={`cursor-pointer transition hover:opacity-80 ${
                    item.read
                      ? "bg-transparent border border-primary text-primary"
                      : ""
                  }`}
                >
                  {item.read ? "Mark as Unread" : "Mark as Read"}
                  {item.read && (
                    <Check size={18} className="ml-1 text-green-500" />
                  )}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsContent;
