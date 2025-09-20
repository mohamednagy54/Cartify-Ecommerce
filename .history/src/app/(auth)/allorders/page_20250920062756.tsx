"use client";

import { useAppContext } from "@/context/appContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import MainLoader from "@/components/common/MainLoader";

export default function AllOrdersPage() {
  const { handleGetUserOrders, orders, turncateText, ordersPageLoading } =
    useAppContext();

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      handleGetUserOrders(session.user.id);
    }
  }, [session?.user?.id, handleGetUserOrders]);

  if (ordersPageLoading && (!orders || orders.length === 0)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <MainLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center m-2">
      <div className="w-full md:w-2/3 mt-8 pt-24">
        <h1 className="text-2xl font-medium mb-4">Orders</h1>

        <div className="mt-4 flex flex-col gap-2 border p-2 rounded-md">
          <div className="flex justify-between gap-4 px-2 py-3 bg-gray-100 font-semibold rounded-md">
            <span className="w-1/4">ID</span>
            <span className="w-1/4">Price</span>
            <span className="w-1/4">Date</span>
            <span className="w-1/4">Status</span>
          </div>

          {orders && orders.length > 0 ? (
            [...orders]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((order) => {
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
