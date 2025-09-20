"use client";
import { MdDelete } from "react-icons/md";
import { useAppContext } from "@/context/appContext";
import Image from "next/image";

import {
  clearCart,
  getAllCartItems,
  updateCartItemCount,
} from "@/CartActions/CartActions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import CounterProduct from "./CounterProduct";
import MainLoader from "./MainLoader";

export default function CartPageClient() {
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const { cart, handleRemoveItem, setCart, formatPrice, cartPageLoading,removingId } =
    useAppContext();

  async function handleCountOperations(
    type: string,
    productId: string,
    count: number
  ) {
    try {
      setLoadingProductId(productId);
      let newCount = count;

      if (type === "i") {
        newCount = count + 1;
      } else if (type === "d") {
        newCount = count - 1;
      }

      const data = await updateCartItemCount(productId, newCount);

      if (data.status === "success") {
        setCart(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to update product count");
      }
    } finally {
      setLoadingProductId(null);
    }
  }

  async function handleClearCart() {
    try {
      const result = await clearCart();

      if (result.message === "success") {
        const data = await getAllCartItems();
        setCart(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to remove product");
      }
    }
  }


  if (cartPageLoading && (!cart || cart.data.products.length === 0)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <MainLoader />
      </div>
    );
  }

  return (
    <div className="px-4 py-12 md:px-8 lg:px-16 xl:px-32 2xl:px-40 pt-24 ">
      <div className="">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
          <span className="text-[#F35C7A] ml-2">
            ({cart?.data.products.length ?? 0})
          </span>
        </h1>

        <div className="flex flex-col  gap-6 max-h-[500px] overflow-y-auto">
          {!cart || cart.data.products.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-10">
              No products in your cart 🛒
            </p>
          ) : (
            cart.data.products.map((product) => {
              const {
                product: { _id: productId, imageCover, title },
                count,
                price,
              } = product;

              return (
                <div
                  className="flex justify-between  flex-col md:flex-row gap-2 border border-gray-100 rounded-2xl p-4 shadow-sm"
                  key={productId}
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={imageCover}
                      alt={title}
                      width={80}
                      height={80}
                      className="object-cover rounded-xl border"
                    />
                    <div>
                      <h2 className="text-lg font-medium">{title}</h2>
                      <p className="text-gray-700 text-sm mt-2">
                        {formatPrice(price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <CounterProduct
                      count={count}
                      loading={loadingProductId === productId}
                      onIncrement={() =>
                        handleCountOperations("i", productId, count)
                      }
                      onDecrement={() =>
                        handleCountOperations("d", productId, count)
                      }
                    />

                    <button
                      onClick={() => handleRemoveItem(productId)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <MdDelete className="w-5 h-5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-2xl mt-4 mb-6">
          <span className="text-lg font-medium">Total Cart Price</span>
          <span className="text-xl font-bold text-[#F35C7A]">
            {formatPrice(cart?.data.totalCartPrice ?? 0)}
          </span>
        </div>
        {!cart ||
          (cart?.data?.products?.length > 0 && (
            <div className="flex justify-between my-6 items-center">
              <button
                onClick={handleClearCart}
                className="text-sm px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <span>Clear Cart</span>
              </button>
              <Link href="/checkout">
                <Button className="bg-black px-6 py-2 disabled:cursor-not-allowed disabled:opacity-75">
                  Checkout
                </Button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
