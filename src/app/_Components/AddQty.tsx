"use client";

import { useAppContext } from "@/context/appContext";
import { ProductType } from "@/types/products.type";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

interface QtyProps {
  qty: number;
  product: ProductType;
}

export default function AddQty({ qty, product }: QtyProps) {
  const { handleAddToCart } = useAppContext();

  return (
    <div className="flex flex-col gap-4">
      {/* <h4 className="font-medium">Choose a Quantity</h4> */}
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
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
      </div>
      <div className="flex justify-between items-center">
        <button
          className="w-36 text-sm rounded-3xl  hover:bg-[#dd6b82]  py-2 px-4 bg-[#F35C7A] text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none cursor-pointer"
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </button>

        <button
          className="p-2 rounded-full cursor-pointer text-black hover:bg-[#F35C7A] hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            console.log("Added to wishlist:", product._id);
          }}
        >
          <AiOutlineHeart size={24} />
        </button>
      </div>
    </div>
  );
}
