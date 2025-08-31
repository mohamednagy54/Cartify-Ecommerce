import { ProductType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductListProps {
  limit?: number;
  filterType?: string;
  searchParams?: string;
  categoryId?: string;
}




export default async function ProductList({
  limit,
  searchParams,
  filterType,
  categoryId,
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

  function turncateText(text: string, maxChars: number) {
    if (text.length <= maxChars) return text;

    return text.slice(0, maxChars) + "...";
  }

  function formatPrice(value: number) {
    return new Intl.NumberFormat("En-EG", {
      style: "currency",
      currency: "EGP",
    }).format(value);
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products available at the moment
      </div>
    );
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products?.map((product: ProductType) => {
        const {
          _id,
          imageCover,
          description,
          price,
          title,
          images,
          priceAfterDiscount,
        } = product;

        return (
          <Link
            href={"/single-product/" + _id}
            key={_id}
            className="flex flex-col gap-4 w-96 mx-auto sm:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-96">
              {imageCover && (
                <Image
                  src={imageCover}
                  alt={title || "Product image"}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
                />
              )}

              {images && images.length > 1 && images[2] && (
                <Image
                  src={images[2]}
                  alt={title || "Product image"}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">{turncateText(title, 25)}</span>
              <span className="font-bold">
                {priceAfterDiscount === 0 || priceAfterDiscount === undefined
                  ? formatPrice(price)
                  : formatPrice(priceAfterDiscount)}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              {turncateText(description, 50)}
            </div>

            <button className="rounded-2xl w-max ring-1 ring-[#F35C7A] text-[#F35C7A] py-2 px-4 text-xs cursor-pointer hover:bg-[#F35C7A] hover:text-white transition-colors">
              Add to Cart
            </button>
          </Link>
        );
      })}
    </div>
  );
}
