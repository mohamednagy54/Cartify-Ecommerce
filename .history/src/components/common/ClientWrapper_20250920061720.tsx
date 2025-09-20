"use client";

import { useAppContext } from "@/context/appContext";
import MainLoader from "./MainLoader";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { globalLoading, wishlistPageLoading, wishlist } = useAppContext();

  // إذا كان globalLoading نشط، اعرض MainLoader
  if (globalLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <MainLoader />
      </div>
    );
  }

  // إذا كان wishlistPageLoading نشط ولا يوجد منتجات في الـ wishlist، اعرض MainLoader
  if (wishlistPageLoading && wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <MainLoader />
      </div>
    );
  }

  return <>{children}</>;
}
