import { ProductType } from "@/types/products.type";
import React from "react";
import ProductCard from "./ProductCard";

interface ProductListClientProps {
  initialProducts: ProductType[];
  search?: string;
  useContext?: boolean;
}

export default function ProductListGrid({
  initialProducts,
}: ProductListClientProps) {
  const heroProduct = initialProducts[8];
  const regularProducts = initialProducts.slice(1, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  ">
      {/* Hero Product - takes full height */}
      <div className="h-[600px] lg:h-[800px]">
        <ProductCard product={heroProduct} isHero />
      </div>

      {/* Regular Products Grid - exactly 4 cards in 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 h-full md:h-[600px] lg:h-[800px]">
        {regularProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
