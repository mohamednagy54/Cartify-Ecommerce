"use client";

import { useAppContext } from "@/context/appContext";
import { ProductType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";

import React, { useEffect } from "react";

import { FiShoppingCart } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

interface ProductListClientProps {
  initialProducts: ProductType[];
  search?: string;
  useContext?: boolean;
}

export default function ProductListClient({
  initialProducts,
  useContext = false,
}: ProductListClientProps) {
  const {
    filteredProducts,
    setFilteredProducts,
    setProducts,
    searchValue,
    handleAddToCart,
    handleAddToWishlist,
    wishlist,
    formatPrice,
    cartLoading,
    wishlistLoading,
    cart
  } = useAppContext();

  useEffect(() => {
    if (useContext) {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    }
  }, [initialProducts, setProducts, setFilteredProducts, useContext]);

  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");
  const brandName = searchParams.get("brand");

  const filtered = searchValue
    ? (useContext ? filteredProducts : initialProducts).filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : useContext
    ? filteredProducts
    : initialProducts;

  let finalFiltered = filtered;

  if (categoryName) {
    finalFiltered = filtered.filter(
      (product) => product.category.slug === categoryName
    );
  } else if (brandName) {
    finalFiltered = filtered.filter(
      (product) => product.brand.slug === brandName
    );
  }

  

  if (!finalFiltered || finalFiltered.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products available at the moment
      </div>
    );
  }

  return (
    <div className="mt-12 flex gap-4 justify-start flex-wrap">
      {finalFiltered?.map((product: ProductType) => {
        const { _id, imageCover, description, price, title, images } = product;

        const isWishlisted = wishlist.some((item) => item._id === product._id);

        const cartItem = cart?.data.products.find(
          (item) => item.product._id === product._id
        );

        const alreadyInCart = !!cartItem;

        return (
          <div
            key={_id}
            className="flex flex-col h-full w-full sm:w-[48%] lg:w-[32%] xl:w-[23%]
    bg-white rounded-xl overflow-hidden border border-gray-100 
    hover:border-gray-200 transition-all duration-300"
          >
            {/* Product Image Container */}
            <div className="w-full h-82 relative bg-gray-50 rounded-t-xl overflow-hidden">
              {imageCover && (
                <Image
                  src={imageCover}
                  alt={title || "Product image"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority
                  className="absolute object-cover z-10 hover:opacity-0 transition-opacity ease duration-500"
                />
              )}

              {images && images.length > 1 && images[2] ? (
                <Image
                  src={images[2]}
                  alt={title || "Product image"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority
                  className="absolute object-cover"
                />
              ) : (
                <Image
                  src={imageCover}
                  alt={title || "Product image"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority
                  className="absolute object-cover"
                />
              )}

              {/* Wishlist Icon */}
              <button
                type="button"
                className={`absolute top-3 right-3 p-2 rounded-full  
                          transition-colors cursor-pointer shadow-sm z-20
                          ${
                            isWishlisted
                              ? "bg-[#F35C7A] text-white"
                              : "bg-white/90 text-black/70 hover:text-white hover:bg-[#F35C7A]"
                          } ${
                  wishlistLoading === _id ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleAddToWishlist(product);
                }}
                disabled={!!wishlistLoading}
              >
                {wishlistLoading === product._id ? (
                  <div className="w-4 h-4 border-2 border-black/70 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <AiOutlineHeart size={18} />
                )}
              </button>
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-grow p-4 pt-3">
              {/* Category/Brand */}
              <p className="text-xs text-gray-500 mb-1 font-medium">
                Brand Name
              </p>

              {/* Product Title */}
              <Link href={"/single-product/" + _id}>
                <h3 className="font-medium text-gray-900 text-sm mb-1 hover:text-[#F35C7A]  transition-colors cursor-pointer line-clamp-1">
                  {title}
                </h3>
              </Link>

              {/* Description */}
              <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">
                {description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="font-bold text-black text-base">
                  {formatPrice(price)}
                </div>

                <div className="flex items-center gap-2">
                  {alreadyInCart ? (
                    <CounterProduct
                      count={cartItem.count}
                      loading={loadingProductId === _id}
                      isHero={false}
                      onIncrement={() =>
                        handleCountOperations(
                          "i",
                          cartItem.product._id,
                          cartItem.count
                        )
                      }
                      onDecrement={() =>
                        handleCountOperations(
                          "d",
                          cartItem.product._id,
                          cartItem.count
                        )
                      }
                    />
                  ) : (
                    {/* Cart Icon */}
                  <button
                    className={`p-2 rounded-full border border-black/70 cursor-pointer transition-all flex items-center justify-center ${
                      cartLoading === _id
                        ? "bg-[#F35C7A] cursor-not-allowed pointer-events-none border-white"
                        : "hover:bg-[#F35C7A] hover:text-white hover:border-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product._id);
                    }}
                    disabled={!!cartLoading}
                  >
                    {cartLoading === _id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiShoppingCart size={16} />
                    )}
                  </button>
                  )}

                  
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
