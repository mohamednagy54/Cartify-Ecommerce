"use client";

import { useAppContext } from "@/context/appContext";
import { ProductType } from "@/types/products.type";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";

import React, { useEffect } from "react";

import { FiShoppingCart } from "react-icons/fi";

import { removeFromWishlist } from "@/WishlistActions/WishlistActions";
import { toast } from "sonner";
import { WishlistItem } from "@/types/wishlist.type";

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
    products,
    setProducts,
    searchValue,
    handleAddToCart,
    setWishlist,
    wishlist,
  } = useAppContext();

  useEffect(() => {
    if (useContext) {
      setProducts(initialProducts);
    }
  }, [initialProducts, setProducts, useContext]);

  const filtered = searchValue
    ? (useContext ? products : initialProducts).filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : useContext
    ? products
    : initialProducts;

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

  async function handleAddToWishlist(product: ProductType) {
    try {
      const isAlreadyWishlisted = wishlist.some(
        (item) => item._id === product._id
      );

      if (isAlreadyWishlisted) {
        
        
        const data = await removeFromWishlist(product._id);

        if (data) {
          toast.success("Product removed from your wishlist!");
          setWishlist((prev) =>
            prev.filter((item) => item._id !== product._id)
          );
        }
      } else {
        
        
        toast.success("Product added successfully to your wishlist!");
        setWishlist((prev) => [...prev, product as WishlistItem]);
      }
    } catch (error: any) {
      toast.error(error.message || "something went wrong");
    }
  }

  if (!filtered || filtered.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products available at the moment
      </div>
    );
  }

  return (
    <div className="mt-12 flex gap-6 justify-start flex-wrap">
      {filtered?.map((product: ProductType) => {
        const { _id, imageCover, description, price, title, images } = product;

        const isWishlisted = wishlist.some((item) => item._id === product._id);

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
                className={`absolute top-3 right-3 p-2 rounded-full  
        transition-colors cursor-pointer shadow-sm z-20
        ${
          isWishlisted
            ? "bg-[#F35C7A] text-white"
            : "bg-white/90 text-black/70 hover:text-white hover:bg-[#F35C7A]"
        }`}
                onClick={() => handleAddToWishlist(product)}
              >
                <AiOutlineHeart size={18} />
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

              {/* Price + Actions */}
              <div className="flex items-center justify-between mt-auto">
                {/* Price */}
                <div className="font-bold text-black text-base">
                  {formatPrice(price)}
                </div>

                {/* Icons */}
                <div className="flex items-center gap-2">
                  {/* Cart Icon */}
                  <button
                    className="p-2 rounded-full border border-black/70 hover:bg-[#F35C7A] hover:text-white hover:border-white cursor-pointer transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product._id);
                    }}
                  >
                    <FiShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
