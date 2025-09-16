"use client";

import { useAppContext } from "@/context/appContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

export default function AllOrdersPage() {
  const { handleGetUserOrders, orders, turncateText } = useAppContext();

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      handleGetUserOrders(session.user.id);
    }
  }, [session?.user?.id]);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full md:w-2/3 mt-8 pt-24">
        <h1 className="text-2xl font-medium">Orders</h1>

        <div className="mt-12 flex flex-col gap-2 border p-2 rounded-md">
          {orders && orders.length > 0 ? (
            orders.map((order) => {
              const { _id, totalOrderPrice, createdAt, isDelivered } = order;

              return (
                <Link
                  href={`/allorders/${_id}`}
                  key={_id}
                  className="flex justify-between gap-4 px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100 cursor-pointer"
                >
                  <span className="w-1/4">{turncateText(_id, 5)}</span>
                  <span className="w-1/4">EGP {totalOrderPrice}</span>
                  <span className="w-1/4">
                    {new Date(createdAt).toLocaleDateString()}
                  </span>
                  <span className="w-1/4">
                    {isDelivered ? "Delivered" : "Pending"}
                  </span>
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-8">No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
}
