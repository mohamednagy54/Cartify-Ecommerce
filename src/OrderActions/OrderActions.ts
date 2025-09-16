"use server";

import { getUserToken } from "@/utils/getUserToken";

export async function getUserOrders(userId: string | undefined) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`,
    {
      method: "GET",
    }
  );

  const data = await res.json();

  if (!data) {
    throw new Error(data.message || "Failed to fetch Orders");
  }

  return data;
}
