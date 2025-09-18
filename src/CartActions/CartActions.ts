"use server";

import { getUserToken } from "@/utils/getUserToken";

export async function getAllCartItems() {
  const token = await getUserToken();

  if (!token) {
    return null;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      token: token as string,
    },
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to fetch cart");
  }

  return data;
}

export async function addToCart(productId: string) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({ productId: productId }),
  });

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to add product to Cart");
  }

  return data;
}

export async function removeItemFromCart(productId: string) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
    }
  );
  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to remove product from cart");
  }
  return data;
}

export async function updateCartProductQty(productId: string, qty = 1) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({
        count: qty,
      }),
    }
  );
  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to Update product from cart");
  }
  return data;
}
export async function clearCart() {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      token: token as string,
    },
  });
  const data = await res.json();

  if (data.message === "success") {
    return data;
  } else {
    throw new Error(data.message || "Failed to Clear cart");
  }
}

export async function updateCartItemCount(productId: string, count: number) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },

      body: JSON.stringify({
        count,
      }),
    }
  );

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to update cart");
  }

  return data;
}
