"use server";

import { getUserToken } from "@/utils/getUserToken";

export async function checkoutSession(
  payload: {
    shippingAddress: { details?: string; phone: string; city: string };
  },
  cartId: string | undefined
) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to complete checkout session!");
  }

  return data;
}
export async function createCashOrder(
  payload: {
    shippingAddress: { details?: string; phone: string; city: string };
  },
  cartId: string | undefined
) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to complete checkout session!");
  }

  return data;
}
