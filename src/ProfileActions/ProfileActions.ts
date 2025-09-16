"use server";

import { getUserToken } from "@/utils/getUserToken";
import { PasswordFormType, UpdateFormType } from "../app/(auth)/profile/page";

export async function updateLoggedUserData(userData: UpdateFormType) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/updateMe/`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await res.json();

  return data;
}
export async function updateLoggedUserPassword(userData: PasswordFormType) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/changeMyPassword`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await res.json();

  return data;
}
