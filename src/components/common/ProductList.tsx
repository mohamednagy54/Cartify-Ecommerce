import { ProductType } from "@/types/products.type";

import React from "react";
import ProductListClient from "./ProductListClient";
import ProductListGrid from "./ProductListGrid";

interface ProductListProps {
  limit?: number;
  filterType?: string;
  searchParams?: string;
  useContext?: boolean;
  variant?: "default" | "grid";
}

export default async function ProductList({
  limit,
  filterType,

  useContext = false,
  variant = "default",
}: ProductListProps) {
  const queryParams = new URLSearchParams();
  if (limit) queryParams.append("limit", limit.toString());
  if (filterType) queryParams.append("sort", `-${filterType}`);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  const products: ProductType[] = data.data || [];

  return (
    <>
      {variant === "grid" ? (
        <ProductListGrid initialProducts={products} useContext={useContext} />
      ) : (
        <ProductListClient initialProducts={products} useContext={useContext} />
      )}
    </>
  );
}
