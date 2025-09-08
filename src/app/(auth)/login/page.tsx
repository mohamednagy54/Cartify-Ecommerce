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
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const LoginSchema = zod.object({
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
  });

  const LoginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  async function handleLogin(values: zod.infer<typeof LoginSchema>) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Login successful");
      router.push("/");
    } else {
      toast.error(res?.error || "Invalid credentials");
    }

    
  }

  return (
    <div className="mt-32 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <Form {...LoginForm}>
          <form
            onSubmit={LoginForm.handleSubmit(handleLogin)}
            className="space-y-4"
          >
            {/* Email */}
            <FormField
              control={LoginForm.control}
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
              control={LoginForm.control}
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

            <Button
              type="submit"
              className="w-full bg-[#F35C7A] hover:bg-[#d94c68]"
            >
              Login
            </Button>
          </form>
        </Form>

        {/* Link to login */}
        <div className="mt-4 text-center">
          <Link
            href="/register"
            className="text-sm text-gray-600 hover:underline"
          >
            Dont Have an account?{" "}
            <span className="text-[#F35C7A]">Register</span>
          </Link>
          <br />
          <Link
            href="/forget-password"
            className="text-sm text-gray-600 hover:underline"
          >
            Forget Password ?
          </Link>
        </div>
      </div>
    </div>
  );
}
