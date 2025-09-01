import AddQty from "@/app/_Components/AddQty";
import CustomizeProducts from "@/app/_Components/CustomizeProducts";
import ProductImages from "@/app/_Components/ProductImages";
import RatingStars from "@/app/_Components/RatingStars";
import Reviews from "@/app/_Components/Reviews";
import { ProductType } from "@/types/products.type";
import React, { Suspense } from "react";

export default async function SingleProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: id } = await params;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  const {
    _id,
    title,
    images,
    description,
    price,
    priceAfterDiscount,
    quantity,
    ratingsAverage,
    reviews,
  }: ProductType = data.data;

  function formatPrice(value: number) {
    return new Intl.NumberFormat("En-EG", {
      style: "currency",
      currency: "EGP",
    }).format(value);
  }

  console.log(reviews);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mt-[90px]">
      {/* Img */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages images={images} />
      </div>

      {/* Product Info */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{title}</h1>
        <p className="text-gray-500 text-sm font-medium">{description}</p>

        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          {priceAfterDiscount === undefined || priceAfterDiscount === 0 ? (
            <>
              <h2 className="font-bold text-2xl">{formatPrice(price)}</h2>
            </>
          ) : (
            <>
              <h3 className="line-through text-gray-500 text-xl">
                {formatPrice(price)}
              </h3>
              <h2 className="font-bold text-2xl">
                {formatPrice(priceAfterDiscount)}
              </h2>
            </>
          )}
        </div>

        <div className="h-[2px] bg-gray-100 " />

        {/* Colors & Sizes */}
        {/* <CustomizeProducts /> */}

        {/* Stars */}
        <RatingStars rating={ratingsAverage} />

        {/* Add Quantitiy */}
        <AddQty qty={quantity || 0} product={data.data} />

        <div className="h-[2px] bg-gray-100" />
        {/* Additional info */}
        <div className="text-sm">
          <h4 className="font-medium mb-4 uppercase">Return & Refund Policy</h4>
          <p>
            All purchases can be returned within 14 days of delivery. Refunds
            will be processed within 5–7 business days.
          </p>
        </div>
        {/* Additional info */}
        <div className="text-sm">
          <h4 className="font-medium mb-4 uppercase">Shipping Info</h4>
          <p>
            We offer worldwide shipping with tracking. Standard delivery usually
            takes 5–10 business days.
          </p>
        </div>
        {/* Additional info */}
        <div className="text-sm">
          <h4 className="font-medium mb-4 uppercase">Warranty</h4>
          <p>
            All products come with a 1-year manufacturer warranty. Terms and
            conditions apply.
          </p>
        </div>

        <div className="h-[2px] bg-gray-100" />

        {/* Reviews */}
        <h1 className="text-2xl">User Reviews</h1>
        {reviews && reviews?.length > 0 ? (
          <Suspense fallback="Loading...">
            <Reviews />
          </Suspense>
        ) : (
          <p className="text-gray-500 text-sm">No Reviews To Show</p>
        )}
      </div>
    </div>
  );
}
