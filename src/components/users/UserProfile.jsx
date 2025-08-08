import React from "react";
import Link from "next/link";
import { Bell, Icon, LogIn, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ErrorSkeleton from "../skeleton/ErrorSkeleton";
import { useRouter } from "next/navigation";
import { getCurrentUser, getNotifications, logoutUser } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { formatTags } from "@/helpers/formatTags";
import SmallLoadingSkeleton from "../skeleton/SmallLoadingSkeleton";
import { Badge } from "../ui/badge";
import NotificationDropdown from "./NotificationDropdown";

const userItems = [
  {
    title: "Profile",
    icon: LogIn,
    href: "/",
    action: "profile",
  },
  {
    title: "Logout",
    icon: LogOut,
    href: "/",
    action: "logout",
  },
];

const UserProfile = () => {
  const router = useRouter();

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });

  const {
    data: notificationData,
    isLoading: notificationIsLoading,
    isError: notificationIsError,
    error: notificationError,
    refetch: notificationRefetch,
  } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: getNotifications,
  });
  // console.log("notificationData", notificationData);

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onMutate: () => {
      toast.loading("Logging out...", { id: "logout-toast" });
    },
    onSuccess: (res) => {
      if (res?.data?.alreadyLoggedOut) {
        toast.error(`Hey 👋, ${res.message || "Already logged out"}`, {
          id: "logout-toast",
        });
      } else {
        toast.success(`Hey 👋, ${res.message || "Logged out successfully"}`, {
          id: "logout-toast",
        });
      }
      localStorage.removeItem("userInfo");
      window.dispatchEvent(new Event("userInfoChanged"));
      router.push("/signin");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast.error(error.message || "Logout failed", {
        id: "logout-toast",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (userIsError || notificationIsError) {
    return (
      <ErrorSkeleton
        message={userError?.message || notificationError?.message}
        onRetry={() => {
          userRefetch();
          notificationRefetch();
        }}
      />
    );
  }

  if (
    userIsLoading ||
    notificationIsLoading ||
    !userData ||
    !notificationData
  ) {
    return <SmallLoadingSkeleton />;
  }

  return (
    <div className="flex items-center gap-2">
      {notificationData && (
        <NotificationDropdown
          notifications={notificationData?.notifications || []}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border-2 border-primary">
            <AvatarFallback className="uppercase">
              {formatTags(userData?.user?.name || "Dummy")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            {userItems.map((item, index) => {
              const Icon = item.icon;
              return item.action === "logout" ? (
                <DropdownMenuItem
                  key={index}
                  onClick={handleLogout}
                  className="font-semibold text-primary cursor-pointer flex items-center justify-between"
                >
                  <span>{item.title}</span>
                  <DropdownMenuShortcut>
                    <Icon size={16} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  key={index}
                  className="font-semibold text-primary cursor-pointer"
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between w-full"
                  >
                    <span>{item.title}</span>
                    <DropdownMenuShortcut>
                      <Icon size={16} />
                    </DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
