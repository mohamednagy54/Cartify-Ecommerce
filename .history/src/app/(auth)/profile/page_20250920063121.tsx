"use client";

import {
  updateLoggedUserData,
  updateLoggedUserPassword,
} from "@/ProfileActions/ProfileActions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/appContext";
import { zodResolver } from "@hookform/resolvers/zod";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";
import MainLoader from "@/components/common/MainLoader";

export const UpdateSchema = zod.object({
  name: zod
    .string()
    .min(2, "Name must contain at least 2 characters")
    .optional(),

  email: zod
    .string()
    .nonempty("Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be in the format: example@domain.com"
    ),

  phone: zod
    .string()
    .nonempty("Egyptian Phone is required")
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Phone must be a valid Egyptian number"),
});

export const PasswordSchema = zod
  .object({
    currentPassword: zod.string().nonempty("Current password is required"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    rePassword: zod.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type UpdateFormType = zod.infer<typeof UpdateSchema>;
export type PasswordFormType = zod.infer<typeof PasswordSchema>;

export default function Profile() {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { handleGetUserOrders, orders, turncateText, profilePageLoading } = useAppContext();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      handleGetUserOrders(session.user.id);
    }
  }, [session?.user?.id]);

  type FormType = UpdateFormType | PasswordFormType;

  const form = useForm({
    defaultValues: isResetPassword
      ? { currentPassword: "", password: "", rePassword: "" }
      : {
          name: "",
          email: "",
          phone: "",
        },
    resolver: zodResolver(isResetPassword ? PasswordSchema : UpdateSchema),
  });

  async function handleOnSubmit(values: FormType) {
    try {
      if (isResetPassword) {

        const resetValues = values as PasswordFormType;
        const data = await updateLoggedUserPassword(resetValues);

        if (data.message === "success") {
          toast.success("Password Reseted Successfully!");
          await signOut({
            callbackUrl: "/login",
          });
        } else {
          toast.error(data?.message || "Reset failed");
        }
      } else {
        const updateValues = values as UpdateFormType;
        const data = await updateLoggedUserData(updateValues);

        if (data.message === "success") {
          toast.success(
            "Update Successful!, if you want to see changes Re-login"
          );
        } else {
          toast.error(data?.errors?.msg || "Update failed");
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  useEffect(() => {
    if (session?.user && !isResetPassword) {
      form.reset({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session, isResetPassword, form]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40 flex justify-center items-center min-h-screen pt-24">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-40">
        {/* Left */}
        <div className="w-full md:w-1/2">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-medium">
                {isResetPassword ? "Reset Password" : "Update Your Profile"}
              </h1>
              <span className="text-gray-500">or</span>
              <p
                onClick={() => {
                  setIsResetPassword(!isResetPassword);
                  form.reset(
                    isResetPassword
                      ? { name: "", email: "", phone: "" }
                      : { currentPassword: "", password: "", rePassword: "" }
                  );
                }}
                className="p-2 text-sm bg-green-300 text-green-700 rounded-md cursor-pointer"
              >
                {isResetPassword ? "Edit Profile" : "Reset Password"}
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleOnSubmit)}
                className="mt-12 flex flex-col gap-4"
              >
                {!isResetPassword ? (
                  <>
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700">
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0 md:max-w-96"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700">
                            E-mail
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="test@gmail.com"
                              type="email"
                              className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0 md:max-w-96"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0 md:max-w-96"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <>
                    {/* Current Password */}
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700">
                            Current Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0 md:max-w-96"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* New Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0 md:max-w-96"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="rePassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0 md:max-w-96"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#F35C7A] hover:bg-[#d94c68] md:max-w-96"
                >
                  {!isResetPassword ? "Update" : "Reset"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 mt-8">
          <h1 className="text-2xl font-medium">Orders</h1>

          <div className="mt-12 flex flex-col gap-2  border p-2 rounded-md">
            {orders && orders.length > 0 ? (
              orders.map((order) => {
                const {
                  _id: orderId,
                  totalOrderPrice,
                  createdAt,
                  isDelivered,
                } = order;

                return (
                  <Link
                    href={`/allorders/${orderId}`}
                    key={order._id}
                    className="flex justify-between gap-4 px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100 cursor-pointer"
                  >
                    <span className="w-1/4">{turncateText(orderId, 5)}</span>
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
    </div>
  );
}
