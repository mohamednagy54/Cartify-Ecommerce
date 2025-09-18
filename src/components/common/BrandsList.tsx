import { BrandType } from "@/types/brand.type";

import React from "react";
import BrandsSlider from "./BrandsSlider";

async function getBrands() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await res.json();
    if (data) {
      const seen = new Set();
      const uniqueBrands = data.data.filter((brand: BrandType) => {
        if (seen.has(brand.name)) return false;
        seen.add(brand.name);
        return true;
      });

      return uniqueBrands;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function BrandsList() {
  const brands = await getBrands();

  return <BrandsSlider brands={brands} />;
}
