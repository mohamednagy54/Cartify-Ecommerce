"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";


export default function Filteration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  
  

  function handleFilterChange(value: string, name?: string) {
    console.log(name, value); 
    const params = new URLSearchParams(searchParams);
    
    if (name) {
      params.set(name, value);
      replace(`${pathname}?${params.toString()}`);
    }
    
    

  }

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <Select onValueChange={(val) => handleFilterChange(val, "type")}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl ring-1 ring-gray-400 w-24 pl-2"
          onChange={(e) => handleFilterChange(e.target.value, e.target.name)}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl ring-1 ring-gray-400 w-24 pl-2"
          onChange={(e) => handleFilterChange(e.target.value, e.target.name)}
        />

        <Select onValueChange={(val) => handleFilterChange(val, "cat")}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="new">New Arrival</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(val) => handleFilterChange(val, "filter")}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="All Filters" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Filters</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      

      {/* Sort by */}

      <div className="">
        <Select onValueChange={(val) => handleFilterChange(val, "sort")}>
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
    </div>
  );
}
