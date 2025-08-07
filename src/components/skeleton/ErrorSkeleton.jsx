import { AlertTriangle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const ErrorSkeleton = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
      <AlertTriangle className="w-10 h-10 text-red-500" />
      <p className="text-red-600 text-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" size={"lg"} onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorSkeleton;
