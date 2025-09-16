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
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const RegisterSchema = zod
    .object({
      name: zod
        .string()
        .nonempty("Name is Required")
        .min(2, "min char 2")
        .max(15, "max char 15"),
      email: zod
        .email("Invalid email")
        .nonempty("Email is Required")
        .regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email must be in the format: example@domain.com"
        ),

      password: zod
        .string()
        .nonempty("Password is Required")
        .min(6, "Password must be at least 6 characters"),
      rePassword: zod.string().nonempty("confirmPassword is Required"),
      phone: zod
        .string()
        .nonempty("Phone is Required")
        .regex(
          /^\+20\d{10}$/,
          "Phone must start with +20 and have 10 digits after it"
        ),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      error: "Passwords don't match",
    });

  const registerForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();

  async function handleRegister(formData: zod.infer<typeof RegisterSchema>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    if (data.message === "success") {
      toast.success("Register Successfully, You can login now", {
        position: "top-right",
      });
      registerForm.reset();

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
        <h1 className="text-2xl font-semibold mb-6">Register</h1>

        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(handleRegister)}
            className="space-y-4"
          >
            {/* Username */}
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Username
                  </FormLabel>
                  <FormControl className="">
                    <Input
                      placeholder="Mohamed"
                      {...field}
                      type="text"
                      className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={registerForm.control}
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
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Password
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
            {/* confirm Password */}
            <FormField
              control={registerForm.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Confirm Passwrod
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
            {/* Phone */}
            <FormField
              control={registerForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Phone</FormLabel>
                  <FormControl className="">
                    <Input
                      placeholder="+20123456789"
                      {...field}
                      type="tel"
                      className="ring-2 ring-gray-300 rounded-md p-4 focus:ring-2 focus:ring-[#F35C7A] focus:outline-none border-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-[#F35C7A] hover:bg-[#d94c68]"
            >
              Register
            </Button>
          </form>
        </Form>

        {/* Link to login */}
        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-gray-600 hover:underline">
            Have an account? <span className="text-[#F35C7A]">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
