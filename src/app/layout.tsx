import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

import { Providers } from "./providers";
import { ProductType } from "@/types/products.type";
import { getAllBrands, getAllCategories } from "@/ShopActions/ShopActions";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cartify: Shop Online in Egypt | Fashion, Electronics & More",
  description:
    "Cartify is your online shopping destination in Egypt. Discover top brands, exclusive deals, and fast delivery across Egypt.",
  keywords: [
    "Cartify",
    "online shopping Egypt",
    "fashion Egypt",
    "electronics Egypt",
    "home products",
  ],
  authors: [
    {
      name: "Eng.Mohamed Nagy",
      url: "https://my-portfolio-new-roan.vercel.app/",
    },
  ],
  creator: "Eng.Mohamed Nagy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🔹 Fetch Products
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
    cache: "no-store",
  });
  const productsData = await res.json();
  const products: ProductType[] = productsData.data || [];

  const [brands, categories] = await Promise.all([
    getAllBrands(),
    getAllCategories(),
  ]);

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <Providers
          initialData={{
            products,
            cart: null,
            wishlist: [],
            brands,
            categories,
          }}
        >
          <Suspense fallback={<Loading />}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
