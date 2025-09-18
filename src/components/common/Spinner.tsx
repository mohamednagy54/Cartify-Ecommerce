


"use client";

import React from "react";

export default function Spinner({
  size = 40,
  color = "border-gray-300",
  borderColor = "border-black",
}: {
  size?: number;
  color?: string;
  borderColor?: string;
}) {
  return (
    <div
      className={`w-[${size}px] h-[${size}px] rounded-full border-4 ${color} border-t-[${borderColor}] animate-spin`}
    />
  );
}
