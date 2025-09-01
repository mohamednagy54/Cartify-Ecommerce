import { Suspense } from "react";
import SliderComponent from "./_Components/SliderComponent";
import SkeletonCards from "./_Components/SkeletonCards";
import ProductList from "./_Components/ProductList";
import CategoryList from "./_Components/CategoryList";

export default async function Home() {
  return (
    <div className="mt-10">
      <SliderComponent />

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<SkeletonCards />}>
          <ProductList
            limit={4}
            filterType="ratingsAverage"
            useContext={false}
          />{" "}
        </Suspense>
      </div>

      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>

        <Suspense fallback={<SkeletonCards />}>
          <CategoryList />
        </Suspense>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <Suspense fallback={<SkeletonCards />}>
          <ProductList limit={4} filterType="price" useContext={false} />
        </Suspense>
      </div>
    </div>
  );
}
