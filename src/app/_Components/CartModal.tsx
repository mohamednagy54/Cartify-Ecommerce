"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function CartModal() {
  function handleCheckout() {}

  return (
    <div className="w-max absolute top-14 right-0 p-4 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-6 z-20">
      {/* <div className="">Cart is Empty</div> */}
      <h2 className="text-xl">Shopping Cart</h2>
      {/* List */}
      <div className="flex flex-col gap-8">
        {/* Item */}
        <div className="flex gap-4">
          <Image
            src="https://images.pexels.com/photos/1895015/pexels-photo-1895015.jpeg?_gl=1*1i3fpc1*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTY0MDI5MzMkbzckZzEkdDE3NTY0MDM0OTgkajI4JGwwJGgw"
            alt="product"
            height={96}
            width={72}
            className="object-cover rounded-md"
          />

          <div className="flex flex-col justify-between w-full">
            {/* Top */}
            <div className="">
              {/* Title */}
              <div className="flex items-center justify-between gap-8">
                <h3 className="font-semibold">Givenchy Intense</h3>
                <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                  $18
                </div>
              </div>
              {/* status */}
              <div className="text-sm text-gray-500 uppercase">Available</div>
            </div>

            {/* Bottom */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Qty. 1</span>
              <span className="text-blue-500">Remove</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Image
            src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?_gl=1*ic4yu3*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTY0MDI5MzMkbzckZzEkdDE3NTY0MDM2MjckajI0JGwwJGgw"
            alt="product"
            height={96}
            width={72}
            className="object-cover rounded-md"
          />

          <div className="flex flex-col justify-between w-full">
            {/* Top */}
            <div className="">
              {/* Title */}
              <div className="flex items-center justify-between gap-8">
                <h3 className="font-semibold">HeadPhone</h3>
                <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                  $18
                </div>
              </div>
              {/* status */}
              <div className="text-sm text-gray-500 uppercase">Available</div>
            </div>

            {/* Bottom */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Qty. 1</span>
              <span className="text-blue-500">Remove</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Image
            src="https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?_gl=1*1un5vu4*_ga*NTkwOTc0NDE2LjE3NTQ5MzU4Nzk.*_ga_8JE65Q40S6*czE3NTY0MDI5MzMkbzckZzEkdDE3NTY0MDI5NjUkajI4JGwwJGgw"
            alt="product"
            height={96}
            width={72}
            className="object-cover rounded-md"
          />

          <div className="flex flex-col justify-between w-full">
            {/* Top */}
            <div className="">
              {/* Title */}
              <div className="flex items-center justify-between gap-8">
                <h3 className="font-semibold">Classic Tote Bag</h3>
                <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                  $18
                </div>
              </div>
              {/* status */}
              <div className="text-sm text-gray-500 uppercase">Available</div>
            </div>

            {/* Bottom */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Qty. 1</span>
              <span className="text-blue-500">Remove</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* Bottom */}
      <div className="">
        <div className="flex items-center justify-between font-bold">
          <span className="">Subtotal</span>
          <span className="">$54</span>
        </div>
        <p className="text-gray-500 text-sm mt-2 mb-4">
          Shipping and taxes calculated at checkout.
        </p>

        {/* Btns */}
        <div className="flex justify-between items-center">
          <Button variant="outline">View Cart</Button>
          <Button
            className="bg-black disabled:cursor-not-allowed disabled:opacity-75"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
