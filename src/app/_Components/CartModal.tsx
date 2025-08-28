
"use client"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

export default function CartModal() {



  function handleCheckout() { 
    
  }


  return (
    <div className="w-max absolute top-12 right-0 p-4 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-6 z-20">
      {/* <div className="">Cart is Empty</div> */}
      <h2 className="text-xl">Shopping Cart</h2>
      {/* List */}
      <div className="flex flex-col gap-8">
        {/* Item */}
        <div className="flex gap-4">
          <Image
            src="/product.png"
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
        <div className="flex gap-4">
          <Image
            src="/product.png"
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
          <span className="">$36</span>
        </div>
        <p className="text-gray-500 text-sm mt-2 mb-4">
          Shipping and taxes calculated at checkout.
        </p>

        {/* Btns */}
        <div className="flex justify-between items-center">
          <Button variant="outline">View Cart</Button>
          <Button className='bg-black disabled:cursor-not-allowed disabled:opacity-75' onClick={handleCheckout}>Checkout</Button>
        </div>
      </div>
    </div>
  );
}
