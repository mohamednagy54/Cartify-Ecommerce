"use server";

export async function getAllBrands() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`);

  const data = await res.json();

  if (data.data.length === 0) {
    throw new Error("No Brands Found");
    return [];
  }

  return data.data;
}
export async function getAllCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`
  );

  const data = await res.json();

  if (data.data.length === 0) {
    throw new Error("No Category Found");
    return [];
  }

  return data.data;
}
