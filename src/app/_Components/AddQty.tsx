"use client";

import React, { useState } from "react";

interface QtyProps {
  qty: number;
}

export default function AddQty({ qty }: QtyProps) {
  const [quantity, setQuantity] = useState(1);

  function handleQty(type: "i" | "d") {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < 6) {
      setQuantity((prev) => prev + 1);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between  w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              disabled={quantity === 1}
              onClick={() => handleQty("d")}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQty("i")}
              disabled={quantity === 6}
            >
              +
            </button>
          </div>

          {qty === 0 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : qty <= 5 ? (
            <div className="text-xs">
              Only <span className="text-orange-500">5 items</span> left!
              <br /> {"Don't"} miss it
            </div>
          ) : (
            <span className="text-green-600">In Stock</span>
          )}
        </div>

        <button
          className="w-36 text-sm rounded-3xl ring-1 ring-[#F35C7A] text-[#F35C7A]  py-2 px-4 hover:bg-[#F35C7A] hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none cursor-pointer"
          disabled={qty === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
