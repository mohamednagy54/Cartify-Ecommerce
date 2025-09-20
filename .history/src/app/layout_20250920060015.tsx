import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ClientWrapper from "@/components/common/ClientWrapper";

import { Providers } from "./providers";

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
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            <ClientWrapper>{children}</ClientWrapper>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
