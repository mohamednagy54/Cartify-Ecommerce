"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative w-[400px] h-[400px]">
        <Image
          src="/not-found.jpg"
          alt="Not Found"
          fill
          sizes="400px"
          className="mb-8 object-contain"
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-500 max-w-md mb-6">
        Sorry, the page you are trying to reach does not exist or has been
        moved.
      </p>

      <Link href="/">
        <Button className="bg-[#F35C7A] hover:bg-[#d94e6a] text-white px-6 py-3 rounded-2xl">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
