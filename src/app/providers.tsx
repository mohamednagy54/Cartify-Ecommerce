"use client";

import { AppProvider } from "@/context/appContext";
import { BrandType } from "@/types/brand.type";
import { CartType } from "@/types/cart.type";
import { CategoryType } from "@/types/categories.type";
import { ProductType } from "@/types/products.type";
import { WishlistItem } from "@/types/wishlist.type";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export function Providers({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: {
    products: ProductType[];
    cart: CartType | null;
    wishlist: WishlistItem[];
    brands: BrandType[];
    categories: CategoryType[];
    
  };
}) {
  return (
    <SessionProvider>
      <AppProvider initialData={initialData}>{children}</AppProvider>
    </SessionProvider>
  );
}
