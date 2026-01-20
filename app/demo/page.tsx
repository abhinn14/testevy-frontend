import React from "react";
import { Clock } from "lucide-react";

const Demo = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center text-gray-400">
      <Clock className="h-8 w-8 text-gray-500" />
      <p className="text-lg font-medium text-gray-300">
        This page is coming soon
      </p>
      <p className="text-sm text-gray-500">
        Stay tuned for updates.
      </p>
    </div>
  );
};

export default Demo;
