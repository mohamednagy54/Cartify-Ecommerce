"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import SearchBar from "./SearchBar";
import { useAppContext } from "@/context/appContext";

export default function Filteration() {
  const { brands, categories } = useAppContext();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [brand, setBrand] = useState(searchParams.get("brand") || "all");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "all");
  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");

  function applyFilters() {
    const params = new URLSearchParams();

    if (brand && brand !== "all") params.set("brand", brand);
    if (category && category !== "all") params.set("category", category);
    if (sort && sort !== "all") params.set("sort", sort);
    if (min) params.set("min", min);
    if (max) params.set("max", max);

    router.push(`/list?${params.toString()}`);
  }

  function resetFilters() {
    setBrand("all");
    setCategory("all");
    setSort("all");
    setMin("");
    setMax("");
    router.push("/list");
  }

  return (
    <>
      <form className="mt-12 flex justify-between">
        <div className="flex gap-6 flex-wrap">
          {/* Brand */}
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              <SelectGroup>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem value={brand.slug} key={brand._id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Price */}
          <input
            type="number"
            name="min"
            value={min}
            placeholder="min price"
            className="text-xs rounded-2xl ring-1 ring-gray-400 w-24 pl-2"
            onChange={(e) => setMin(e.target.value)}
          />
          <input
            type="number"
            name="max"
            value={max}
            placeholder="max price"
            className="text-xs rounded-2xl ring-1 ring-gray-400 w-24 pl-2"
            onChange={(e) => setMax(e.target.value)}
          />

          {/* Category */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem value={cat.slug} key={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <button
            type="button"
            onClick={applyFilters}
            className="px-4 py-2 bg-[#F35C7A] text-white rounded-md hover:bg-[#d0415d] transition cursor-pointer"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs rounded-2xl ring-1 ring-gray-400 px-4 py-1 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Sort */}
        <div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="md:w-[200px] w-fit bg-white">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Default</SelectItem>
                <SelectItem value="asc price">Price (low to high)</SelectItem>
                <SelectItem value="desc price">Price (high to low)</SelectItem>
                <SelectItem value="asc lastUpdated">Newest</SelectItem>
                <SelectItem value="desc lastUpdated">Oldest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>

      <SearchBar />
    </>
  );
}
