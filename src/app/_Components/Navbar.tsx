"use client"

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MenuIcon, MountainIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";




const Navbar = () => {



  function handleLogout() { 

  }

  return (
    <header className="fixed top-0 left-0 z-50 flex h-20 w-full justify-between items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-white shadow-md">
      {/* Left */}
      <div className="flex items-center gap-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" prefetch={false}>
          <Image src="/logo.png" alt="logo" width={24} height={24} />
          <h2 className="text-2xl tracking-wide">Cartify</h2>
        </Link>
        {/* navlinks */}
        <nav className=" hidden lg:flex gap-4">
          <Link
            href="/"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            HomePage
          </Link>
          <Link
            href="/list"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Shop
          </Link>
          <Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Deals
          </Link>
          <Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Right */}

      <div className=" items-center justify-between gap-8 hidden lg:flex">
        <SearchBar />
        <NavIcons />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="fixed inset-0 bg-black text-white flex flex-col"
        >
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-4 py-6 text-center">
            <Link href="/" className="w-full py-2 text-xl font-semibold">
              HomePage
            </Link>
            <Link
              href="/list"
              className="w-full py-2 text-xl font-semibold"
              prefetch={false}
            >
              Shop
            </Link>
            <Link
              href="#"
              className="w-full py-2 text-xl font-semibold"
              prefetch={false}
            >
              Deals
            </Link>
            <Link
              href="#"
              className="w-full py-2 text-xl font-semibold"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="w-full py-2 text-xl font-semibold"
              prefetch={false}
            >
              Contact
            </Link>
            <Button
              onClick={handleLogout}
              className="w-full py-2 text-xl font-semibold bg-transparent"
            >
              Logout
            </Button>

            <Link
              href="#"
              className="w-full py-2 text-xl font-semibold"
              prefetch={false}
            >
              Cart (2)
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
