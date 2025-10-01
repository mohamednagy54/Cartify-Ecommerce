"use client";

import React from "react";
import ProductListClient from "./ProductListClient";
import ProductListGrid from "./ProductListGrid";
import { useAppContext } from "@/context/appContext";

interface ProductListProps {
  limit?: number;
  filterType?: string;
  variant?: "default" | "grid";
}

export default function ProductList({
  limit,
  filterType,
  variant = "default",
}: ProductListProps) {
  const { products } = useAppContext();

  let displayedProducts = [...products];

  if (filterType) {
    displayedProducts.sort((a, b) => {
      if (filterType === "ratingsAverage") {
        return b.ratingsAverage - a.ratingsAverage;
      }
      if (filterType === "price") {
        return b.price - a.price;
      }
      return 0;
    });
  }

  if (limit) {
    displayedProducts = displayedProducts.slice(0, limit);
  }

  if (variant === "grid") {
    return <ProductListGrid initialProducts={displayedProducts} />;
  }

  return <ProductListClient initialProducts={displayedProducts} />;
}
