"use server";

import { getUserToken } from "@/utils/getUserToken";

export async function addToWishlist(productId: string) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId: productId }),
    }
  );

  const data = await res.json();
  console.log(data);

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to add product to cart");
  }

  return data;
}
export async function removeFromWishlist(productId: string) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      
    }
  );

  const data = await res.json();
  console.log(data);

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to add product to cart");
  }

  return data;
}

export async function getWishlist() {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
    }
  );

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to add product to cart");
  }

  return data;
}
