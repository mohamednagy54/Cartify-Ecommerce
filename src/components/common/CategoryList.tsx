


import CategorySlider from "./CategorySlider";
import { CategoryType } from "@/types/categories.type";

async function getCategories() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data.data;
}

export default async function CategoryList() {
  const categories: CategoryType[] = await getCategories();

  return <CategorySlider categories={categories} />;
}
