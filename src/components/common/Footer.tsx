import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-40 bg-gray-100 text-sm mt-24">
      {/* Top */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* Left */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">Cartify</div>
          </Link>
          <p>
            3252 El-Nasr Street, Al-Arbaeen Square, Suez District, Suez
            Governorate, 43511, Egypt
          </p>
          <a
            href="mailto:mohamednagy.dev28@gmail.com"
            className="font-semibold"
          >
            mohamednagy.dev28@gmail.com
          </a>
          <span className="font-semibold">+20 01229064632</span>
          <div className="flex gap-6">
            <Image src="/facebook.png" alt="" width={16} height={16} />
            <Image src="/instagram.png" alt="" width={16} height={16} />
            <Image src="/youtube.png" alt="" width={16} height={16} />
            <Image src="/x.png" alt="" width={16} height={16} />
          </div>
        </div>

        {/* Center */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="text-lg font-medium uppercase">Company</h1>

            <div className="flex flex-col gap-6">
              <Link href="">About Us</Link>
              <Link href="">Careers</Link>
              <Link href="">Affiliates</Link>
              <Link href="">Blog</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="text-lg font-medium uppercase">Shop</h1>

            <div className="flex flex-col gap-6">
              <Link href="">New Arrivals</Link>
              <Link href="">Accessories</Link>
              <Link href="">Men</Link>
              <Link href="">Women</Link>
              <Link href="">All Products</Link>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg uppercase">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Customer Service</Link>
              <Link href="">My Account</Link>
              <Link href="">Find a Store</Link>
              <Link href="">Legal & Privacy</Link>
              <Link href="">Gift Card</Link>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg uppercase">Subscribe</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="p-4 w-3/4 bg-white"
            />
            <button className="bg-[#F35C7A] text-white w-1/4">JOIN</button>
          </form>
          <span className="font-semibold text-center md:text-left">
            Secure Payments
          </span>
          <div className="flex justify-center gap-4 md:justify-between md:gap-2">
            <Image src="/discover.png" alt="" width={40} height={20} />
            <Image src="/skrill.png" alt="" width={40} height={20} />
            <Image src="/paypal.png" alt="" width={40} height={20} />
            <Image src="/mastercard.png" alt="" width={40} height={20} />
            <Image src="/visa.png" alt="" width={40} height={20} />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-between items-center flex-col md:flex-row gap-8 mt-16">
        <div className="">© {new Date().getFullYear()} Cartify Shop</div>

        <div className="flex  flex-wrap gap-8">
          <div className="">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">English</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">EGP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
