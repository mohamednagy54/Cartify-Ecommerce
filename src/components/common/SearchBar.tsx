"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (!query) {
      params.delete("q");
    } else {
      params.set("q", query);
    }

    router.push(`/list?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1 mt-8"
    >
      <input
        type="text"
        name="q"
        value={query}
        placeholder="Search"
        className="bg-transparent flex-1 outline-none"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="cursor-pointer">
        <Image src="/search.png" alt="" width={16} height={16} />
      </button>
    </form>
  );
}
