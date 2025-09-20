"use client";

import React from "react";

interface CounterProps {
  count: number;
  loading?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  isHero?: boolean;
}
export default function CounterProduct({
  count,
  loading = false,
  onIncrement,
  onDecrement,
  isHero,
}: CounterProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-3xl px-4 py-2">
      <button onClick={onDecrement} className="text-xl cursor-pointer">
        -
      </button>
      {loading ? (
        <div
          className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin 
      ${
        isHero
          ? " bg-black/40 backdrop-blur-sm border border-white/30 text-white"
          : "border-gray-400"
      }`}
        />
      ) : (
        <span className="w-6 text-center">{count}</span>
      )}
      <button onClick={onIncrement} className="text-xl cursor-pointer">
        +
      </button>
    </div>
  );
}
