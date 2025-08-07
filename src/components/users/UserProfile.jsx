import React from "react";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import LoadingSkeleton from "../skeleton/LoadingSkeleton";
import ErrorSkeleton from "../skeleton/ErrorSkeleton";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { formatTags } from "@/helpers/formatTags";

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

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });
  // console.log("data", data);

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onMutate: () => {
      toast.loading("Logging out...", { id: "logout-toast" });
    },
    onSuccess: (res) => {
      // console.log(res?.data);
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

  if (isError) {
    return <ErrorSkeleton message={error.message} onRetry={() => refetch()} />;
  }

  if (isLoading || !data) {
    <LoadingSkeleton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border-2 border-gray-500/60 dark:border-accent">
          <AvatarFallback className="uppercase">
            {formatTags(data?.user?.name || "Dummy")}
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
                className="font-semibold dark:hover:text-primary cursor-pointer flex items-center justify-between"
              >
                <span>{item.title}</span>
                <DropdownMenuShortcut>
                  <Icon size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={index}
                className="font-semibold dark:hover:text-primary cursor-pointer"
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
  );
};

export default UserProfile;
