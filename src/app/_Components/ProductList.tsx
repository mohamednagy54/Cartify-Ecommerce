import { ProductType } from "@/types/products.type";

import React from "react";
import ProductListClient from "./ProductListClient";

interface ProductListProps {
  limit?: number;
  filterType?: string;
  searchParams?: string;
  categoryId?: string;
  useContext?: boolean;
}

export default async function ProductList({
  limit,
  searchParams,
  filterType,
  categoryId,
  useContext = false
}: ProductListProps) {
  const queryParams = new URLSearchParams();
  if (limit) queryParams.append("limit", limit.toString());
  if (filterType) queryParams.append("sort", `-${filterType}`);
  if (categoryId) queryParams.append("category", `${categoryId}`);

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
    <ProductListClient
      initialProducts={products}
      search={searchParams}
      useContext={useContext}
    />
  );
}
