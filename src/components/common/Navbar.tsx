"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { MenuIcon, MountainIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import NavIcons from "./NavIcons";
import { useAppContext } from "@/context/appContext";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "HomePage" },
  { href: "/list", label: "Shop" },
  { href: "/cart", label: `Cart` },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/allorders", label: "Orders" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { handleLoggingOut, cart } = useAppContext();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 z-50 flex py-4 w-full justify-between items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40 bg-white shadow-md">
      {/* Left */}
      <div className="flex items-center gap-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" prefetch={false}>
          <Image src="/logo.png" alt="logo" width={24} height={24} />
          <h2 className="text-2xl tracking-wide">Cartify</h2>
        </Link>
        {/* navlinks */}
        <nav className=" hidden lg:flex gap-4">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right */}

      <div className=" items-center justify-between gap-8 hidden lg:flex">
        <NavIcons status={status} />
      </div>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-black text-white flex flex-col"
        >
          <SheetTitle>
            <span className="sr-only">Navigation Menu</span>
          </SheetTitle>

          <SheetDescription>
            <span className="sr-only">Use this menu to navigate the site</span>
          </SheetDescription>

          <div className="grid gap-4 py-6 text-center">
            <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="grid gap-4 py-6 text-center">
              {navLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  className={`w-full py-2 text-xl font-semibold ${
                    pathname === link.href ? "text-[#F35C7A]" : ""
                  }`}
                >
                  {link.href === "/cart"
                    ? `Cart (${cart?.data.products.length ?? 0})`
                    : link.label}
                </Link>
              ))}

              {status === "authenticated" && (
                <Button
                  onClick={handleLoggingOut}
                  className="w-full py-2 text-xl font-semibold bg-transparent cursor-pointer"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
