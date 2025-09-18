"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/context/appContext";
import { getAllBrands, getAllCategories } from "@/ShopActions/ShopActions";
import { BrandType } from "@/types/brand.type";
import { CategoryType } from "@/types/categories.type";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Filteration() {
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const searchParams = useSearchParams();
  const {
    filterByBrand,
    filterByCategory,
    filterBySort,
    sortValue,
    filterByPrice,
  } = useAppContext();
  const router = useRouter();

  const categoryName = searchParams.get("category");
  const brandName = searchParams.get("brand");

  async function handleGetBrands() {
    try {
      const brandsItems = await getAllBrands();
      if (brandsItems) {
        setBrands(brandsItems);
      }
    } catch (err: unknown) {
      console.log(err);
    }
  }
  async function handleGetCategories() {
    try {
      const categoryItems = await getAllCategories();
      if (categoryItems) {
        setCategories(categoryItems);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("failed to fetch categories");
      }
    }
  }

  useEffect(() => {
    handleGetBrands();
    handleGetCategories();
  }, []);

  return (
    <form className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <Select onValueChange={(val) => filterByBrand(val)}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            <SelectGroup>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.length > 0 &&
                brands.map((brand) => {
                  const { _id: brandId, name, slug } = brand;

                  return (
                    <SelectItem value={slug} key={brandId}>
                      {name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <input
          type="number"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl ring-1 ring-gray-400 w-24 pl-2"
          onChange={(e) =>
            filterByPrice(
              e.target.value ? Number(e.target.value) : undefined,
              "min"
            )
          }
        />
        <input
          type="number"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl ring-1 ring-gray-400 w-24 pl-2"
          onChange={(e) =>
            filterByPrice(
              e.target.value ? Number(e.target.value) : undefined,
              "max"
            )
          }
        />

        <Select onValueChange={(val) => filterByCategory(val)}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            <SelectGroup>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.length > 0 &&
                categories.map((cat) => {
                  const { _id: categoryId, name, slug } = cat;

                  return (
                    <SelectItem value={slug} key={categoryId}>
                      {name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>

        {categoryName || brandName ? (
          <button
            onClick={() => router.push("/list")}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Show All
          </button>
        ) : (
          ""
        )}
      </div>

      {/* Sort by */}

      <div className="">
        <Select value={sortValue} onValueChange={(val) => filterBySort(val)}>
          <SelectTrigger className="md:w-[200px] w-fit bg-white">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asc price">Price (low to high)</SelectItem>
              <SelectItem value="desc price">Price (high to low)</SelectItem>
              <SelectItem value="asc lastUpdated">Newst</SelectItem>
              <SelectItem value="desc lastUpdated">Oldest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
