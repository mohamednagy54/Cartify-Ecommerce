"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/appContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function CartModal() {
  const { cart, handleRemoveItem, turncateText,removingId } = useAppContext();

  if (!cart || !cart.data || cart?.data.products.length === 0) {
    return (
      <div className="w-max absolute top-14 right-0 p-4 bg-white rounded-md shadow-md z-20">
        <h2 className="text-xl mb-2">Shopping Cart</h2>
        <div className="text-gray-500">Cart is Empty</div>
      </div>
    );
  }

  return (
    <div className="w-max absolute top-14 right-0 p-4 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-6 z-20">
      <h2 className="text-xl">Shopping Cart</h2>
      {/* List */}
      <div className="flex flex-col gap-4 max-h-80 overflow-y-auto scrollbar-custom">
        {/* Item */}
        {cart?.data.products.map((item) => {
          const {
            product: { imageCover, title, _id: productId },
            price,
            count,
          } = item;

          return (
            <div className="flex gap-4 my-2" key={productId}>
              <div className="relative w-[96px] h-[72px]">
                <Image
                  src={imageCover}
                  alt="product"
                  fill
                  sizes="(max-width: 640px) 96px, 120px"
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex flex-col justify-between w-full pr-2">
                {/* Top */}
                <div className="">
                  {/* Title */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold max-w-[200px]">
                      {turncateText(title, 50)}
                    </h3>
                    <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                      {price}
                      <span>EGP</span>
                    </div>
                  </div>
                  {/* status */}
                  <div className="text-sm text-gray-500 uppercase">
                    Available
                  </div>
                </div>

                {/* Bottom */}
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-gray-700 font-medium">
                    Qty. {count}
                  </span>

                  {removingId === productId ? (
                  
                  ) : ()}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleRemoveItem(productId)}
                  >
                    Remove
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      {/* Bottom */}
      <div className="">
        <div className="flex items-center justify-between font-bold">
          <span className="">Subtotal</span>
          <span className="">
            {cart?.data.totalCartPrice
              ? `${cart.data.totalCartPrice} EGP`
              : "0 EGP"}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-2 mb-4">
          Shipping and taxes calculated at checkout.
        </p>

        {/* Btns */}
        <div className="flex justify-between items-center">
          <Link href="/cart">
            <Button variant="outline" className="cursor-pointer">
              View Cart
            </Button>
          </Link>
          <Link href="/checkout">
            <Button className="bg-black disabled:cursor-not-allowed disabled:opacity-75 cursor-pointer">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
