"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CartModal from "./CartModal";

export default function NavIcons() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleLoggingOut() {}

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src="/profile.png"
            alt="profile"
            width={22}
            height={22}
            className="cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 p-4 rounded-md bg-white text-sm shadow-2xl ">
          <DropdownMenuItem>
            <Link href="/profile" className="cursor-pointer !hover:outline-0">
              Profile
            </Link>
          </DropdownMenuItem>

          <div className="cursor-pointer mt-2" onClick={handleLoggingOut}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />

      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] text-white rounded-full flex items-center justify-center text-sm">
          2
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
}
