"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppContext } from "@/context/appContext";

export default function NavIcons({ status }: { status: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { handleLoggingOut,cart } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [status]);

  function handleProfileClick() {
    if (status === "authenticated") {
      setIsProfileMenuOpen((prev) => !prev);
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <DropdownMenu>
        <DropdownMenuTrigger onClick={handleProfileClick}>
          <Image
            src="/profile.png"
            alt="profile"
            width={22}
            height={22}
            className="cursor-pointer"
          />
        </DropdownMenuTrigger>

        {status === "authenticated" && (
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
        )}
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
          { cart?.data.products.length ?? 0}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
}
