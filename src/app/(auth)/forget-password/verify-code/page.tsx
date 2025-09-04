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

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function VerifyCodePage() {
  const ResetPasswordSchema = zod.object({
    resetCode: zod.string().nonempty("Reset code is Required"),
  });

  const ResetForm = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const router = useRouter();

  async function handleVerifyCode(
    formData: zod.infer<typeof ResetPasswordSchema>
  ) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
   
    

    if (data.status === "Success") {
      toast.success("Verification Successfull", { position: "top-right" });
      router.push("/forget-password/reset-password");
    } else {
      toast.error(data.message || "There was an error, please try again", {
        position: "top-right",
      });
    }
  }

  return (
    <div className="mt-32 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Verify Your Email</h1>

        <Form {...ResetForm}>
          <form
            onSubmit={ResetForm.handleSubmit(handleVerifyCode)}
            className="space-y-4"
          >
            <FormField
              control={ResetForm.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem className="w-full mx-auto">
                  <FormLabel className="text-sm text-gray-700">
                    Verification Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="string"
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
              Reset
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-gray-600 hover:underline">
            Go back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
