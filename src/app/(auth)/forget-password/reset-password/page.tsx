"use client";

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

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  useEffect(() => {
    localStorage.removeItem("resetEmail");
  }, []);

  const ResetPasswordSchema = zod.object({
    email: zod
      .email("Invalid email")
      .nonempty("Email is Required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be in the format: example@domain.com"
      ),

    newPassword: zod
      .string()
      .nonempty("Password is Required")
      .min(6, "Password must be at least 6 characters"),
  });

  const ResetForm = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const router = useRouter();

  async function handleResetPassword(
    formData: zod.infer<typeof ResetPasswordSchema>
  ) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (data.token) {
      toast.success("Reset Completed!", { position: "top-right" });
      localStorage.removeItem("resetEmail");
      router.push("/login");
    } else {
      toast.error(data.message || "There was an error, please try again", {
        position: "top-right",
      });
    }
  }

  return (
    <div className="mt-32 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Reset Now!</h1>

        <Form {...ResetForm}>
          <form
            onSubmit={ResetForm.handleSubmit(handleResetPassword)}
            className="space-y-4"
          >
            {/* Email */}
            <FormField
              control={ResetForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    E-mail
                  </FormLabel>
                  <FormControl className="">
                    <Input
                      placeholder="test@gmail.com"
                      {...field}
                      type="email"
                      className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={ResetForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    New Password
                  </FormLabel>
                  <FormControl className="">
                    <Input
                      placeholder="***********"
                      {...field}
                      type="password"
                      className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#F35C7A] hover:bg-[#d94c68]"
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
