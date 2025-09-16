"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Grid2X2, List } from "lucide-react";
import { useAppContext } from "@/context/appContext";
import { getWishlist } from "@/WishlistActions/WishlistActions";
import Link from "next/link";

export default function WishlistPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const { wishlist, setWishlist, formatPrice,handleAddToCart} = useAppContext();

  useEffect(() => {
    async function handleGetWishlist() {
      const wishlistData = await getWishlist();
      setWishlist(wishlistData.data);
    }

    handleGetWishlist();
  }, [setWishlist]);

  console.log(wishlist);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col md:flex-row w-7xl p-4 pt-26">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Wishlist</h1>

          <Tabs defaultValue="favourites" className="mt-4">
            <TabsList>
              <TabsTrigger value="favourites">Favourites</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <p className="text-lg font-medium">Your wishlist is empty</p>
            <p className="text-sm">Start adding products to see them here.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 p-4">
              <div className="mb-4 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      {view === "grid" ? (
                        <Grid2X2 size={18} />
                      ) : (
                        <List size={18} />
                      )}
                      {view === "grid" ? "Grid" : "List"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setView("grid")}>
                      <Grid2X2 className="mr-2 h-4 w-4" /> Grid
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setView("list")}>
                      <List className="mr-2 h-4 w-4" /> List
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Products */}
              {view === "grid" ? (
                <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlist.map((product) => {
                    const { _id, imageCover, price, title } = product;

                    return (
                      <div
                        key={_id}
                        className="border rounded-lg p-2 flex flex-col items-center"
                      >
                        <Image
                          src={imageCover}
                          alt={title}
                          width={150}
                          height={150}
                          className="rounded-md object-cover"
                        />
                        <Link
                          href={"/single-product/" + _id}
                          className="hover:text-[#F35C7A] transition-colors"
                        >
                          <p className="mt-2 font-medium">{title}</p>
                        </Link>
                        <p className="text-green-600 font-semibold">
                          {formatPrice(price)}
                        </p>
                        <Button
                          className="mt-2 w-full"
                          onClick={() => handleAddToCart(_id)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlist.map((product) => {
                    const { _id, imageCover, price, title } = product;

                    return (
                      <div
                        key={_id}
                        className="flex items-center gap-4 border rounded-lg p-2"
                      >
                        <Image
                          src={imageCover}
                          alt={title}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <Link
                            href={"/single-product/" + _id}
                            className="hover:text-[#F35C7A] transition-colors"
                          >
                            <p className="mt-2 font-medium">{title}</p>
                          </Link>
                          <p className="text-green-600 font-semibold">
                            {formatPrice(price)}
                          </p>
                        </div>

                        <Button
                          className="mr-2 "
                          onClick={() => handleAddToCart(_id)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
