import React from "react";

export default function MainLoader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#F35C7A] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700">Processing...</p>
    </div>
  );
}
