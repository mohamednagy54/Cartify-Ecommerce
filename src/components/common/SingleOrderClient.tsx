"use client";

import { useAppContext } from "@/context/appContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function SingleOrderClient({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const { orders, handleGetUserOrders } = useAppContext();
  const { data: session } = useSession();

  useEffect(() => {
    if (orders.length === 0 && session?.user?.id) {
      handleGetUserOrders(session.user.id);
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [orders, session?.user?.id]);

  const order = orders.find((order) => order._id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Order Not Found
      </div>
    );
  }

  const {
    _id,
    totalOrderPrice,
    shippingPrice,
    taxPrice,
    createdAt,
    isDelivered,
    isPaid,
    shippingAddress: { details, phone, city },
    cartItems,
  } = order;

  const formattedDate = createdAt
    ? new Date(order.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // count Total Price [taxes + discount]
  const subTotal = totalOrderPrice || 0;
  const delivery = shippingPrice || 0;
  const salesTax = taxPrice || 0;
  const discount = 0;

  const total = subTotal + delivery + salesTax - discount;

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-4xl  pt-20">
        <h1 className="text-2xl font-bold mb-6">Order Details</h1>

        {/* Order Info */}
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <p>
            <strong>Order ID:</strong> {_id}
          </p>
          <p>
            <strong>Created At:</strong> {formattedDate}
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            {order?.paymentMethodType === "cash"
              ? "Cash on Delivery"
              : "Credit Card"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {isPaid && !isDelivered
              ? "Paid / Not Delivered"
              : !isPaid && isDelivered
              ? "Not Paid / Delivered"
              : "Not Paid / Not Delivered"}
          </p>
        </div>

        {/* Shipping Info */}
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          <p className="text-gray-800">
            City: <span className="text-black">{city.toUpperCase()}</span>
          </p>
          <p className="text-gray-800">
            Phone: <span className="text-black">{phone}</span>
          </p>
          <p className="text-gray-800">
            Details:{" "}
            <span className="text-black">
              {details === "" ? "You didn't provide Details" : details}
            </span>
          </p>
        </div>

        {/* Products */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Products</h2>
          <div className="space-y-4">
            {cartItems.map((product) => {
              const {
                _id: productId,
                count,
                price,
                product: {
                  imageCover,
                  title,
                  brand: { name: brandName },
                },
              } = product;

              return (
                <div
                  className="flex items-center gap-4 border p-3 rounded"
                  key={productId}
                >
                  <div className="relative w-[64px] h-[64px]">
                    <Image
                      src={imageCover}
                      alt={title}
                      fill
                      sizes="64px"
                      className="object-cover rounded"
                    />
                  </div>

                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-600">Brand: {brandName}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {count} × {price} EGP
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 border rounded bg-gray-50 flex flex-col gap-2">
          <p className="flex justify-between">
            <span>Subtotal</span> <span>{subTotal} EGP</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>{" "}
            <span>{delivery === 0 ? "Free" : `${delivery} EGP`} </span>
          </p>
          <p className="flex justify-between">
            <span>Tax</span> <span>{salesTax} EGP</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Total</span> <span>{total} EGP</span>
          </p>
        </div>
      </div>
    </div>
  );
}
