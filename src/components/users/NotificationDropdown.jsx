"use cleint";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell, Check } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markasReadingNotification } from "@/lib/api";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

const NotificationDropdown = ({ notifications = [] }) => {
  const unreadCount = notifications?.filter((n) => !n.read)?.length || 0;

  // console.log(notifications);
  const queryClient = useQueryClient();

  const readingNotificationMutation = useMutation({
    mutationFn: (payload) => markasReadingNotification(payload),
    onMutate: () => {
      toast.loading("read notifi...", { id: "readNotification-toast" });
    },
    onSuccess: (res) => {
      toast.success(`Hey 👋, ${res.message}`, { id: "readNotification-toast" });
      queryClient.invalidateQueries(["getNotifications"]);
    },
    onError: (error) => {
      // console.log(error);
      toast.error(error.message || "reading notification failed", {
        id: "readNotification-toast",
      });
    },
  });

  const handleMarkAsRead = (notification) => {
    // console.log("notification", notification);
    const payload = {
      notificationId: notification.id,
      read: !Boolean(notification.read),
    };
    readingNotificationMutation.mutate(payload);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative border-2 border-primary p-1 rounded-full">
            <Bell className="size-6 cursor-pointer text-primary" />
            {unreadCount > 0 && (
              <div className="absolute -top-2.5 -right-1">
                <Badge
                  className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums flex items-center justify-center"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              </div>
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto space-y-1">
          <DropdownMenuLabel className={"text-primary"}>
            Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications?.length === 0 ? (
            <DropdownMenuItem className="text-gray-500 text-sm">
              No new notifications
            </DropdownMenuItem>
          ) : (
            notifications.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className={`flex justify-between items-start gap-2 py-2 cursor-pointer ${
                  item.read === 1 ? "bg-primary/10" : ""
                }`}
                onClick={() => handleMarkAsRead(item)}
              >
                <div>
                  <p className="text-sm font-medium">{item.message}</p>
                  <p className="text-xs text-primary">
                    {dayjs(item.createdAt).fromNow()}
                  </p>
                </div>
                {item.read === 1 && (
                  <Check size={16} className="text-green-500" />
                )}
              </DropdownMenuItem>
            ))
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/notifications"
              className="w-full text-center text-sm font-semibold text-primary"
            >
              View All
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NotificationDropdown;
