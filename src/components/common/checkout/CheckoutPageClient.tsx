"use client";

import {
  checkoutSession,
  createCashOrder,
} from "@/CheckoutActions/CheckoutActions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/appContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiShoppingTag } from "react-icons/ci";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  phone: z
    .string()
    .nonempty("You need to provide a valid number")
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Phone must be a valid Egyptian number"),
  city: z.string().nonempty({ message: "Please select a country" }),
  details: z.string().nonempty("You must type your address"),
});

const GovernoratesOfEgypt = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Dakahlia",
  "Red Sea",
  "Beheira",
  "Fayoum",
  "Gharbia",
  "Ismailia",
  "Menofia",
  "Minya",
  "Qaliubiya",
  "New Valley",
  "Suez",
  "Aswan",
  "Assiut",
  "Beni Suef",
  "Port Said",
  "Damietta",
  "Sharkia",
  "South Sinai",
  "Kafr El Sheikh",
  "Matrouh",
  "Luxor",
  "Qena",
  "North Sinai",
  "Sohag",
];

export default function CheckoutPageClient() {
  const [isPromo, setIsPromo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const { cart, turncateText, formatPrice, handleLoggingOut, setCart } =
    useAppContext();
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  useEffect(() => {
    if (cart) {
      setIsLoadingCart(false);
    }
  }, [cart]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      details: "",
    },
  });

  async function handleCheckout(
    values: z.infer<typeof formSchema>,
    type: "card" | "cash"
  ) {
    if (isLoading) return;
    setIsLoading(true);

    const payload = {
      shippingAddress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      },
    };

    try {
      if (type === "card") {
        const result = await checkoutSession(payload, cart?.cartId);
        if (result.status === "success") {
          setCart(null);
          window.location.href = result.session.url;
          return;
        }
      }

      if (type === "cash") {
        const result = await createCashOrder(payload, cart?.cartId);
        if (result.status === "success") {
          toast.success("Cash order created successfully!");
          setCart(null);
          router.push("/allorders");
          return;
        }
      }
      toast.error("There is a problem with checkout!");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  // count Total Price [taxes + discount]
  const subTotal = cart?.data?.totalCartPrice || 0;
  const delivery = 0;
  const salesTax = 0;
  const discount = 0;

  const total = subTotal + delivery + salesTax - discount;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20">
      <div className="w-full max-w-7xl  bg-white shadow-md rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <div className="p-4 bg-gray-100 flex justify-between items-center rounded-md text-sm mb-4">
            <span className="text-gray-700">
              Logged In as {session?.user.email}
            </span>

            <span
              className="text-gray-700 underline cursor-pointer"
              onClick={handleLoggingOut}
            >
              Logout
            </span>
          </div>

          <div className="flex flex-col  items-center  w-full h-full mt-6">
            <h2 className="text-2xl font-semibold mb-6">Delivery details</h2>
            <Form {...form}>
              <form className="space-y-4 max-w-md w-full">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          {GovernoratesOfEgypt.map((city) => (
                            <SelectItem key={city} value={city.toLowerCase()}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Details */}
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Your Address"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-gray-100">
          <div className="flex gap-2 items-center justify-between">
            <h2 className="text-xl font-medium mb-4">
              Order summary ({cart?.numOfCartItems})
            </h2>
            <Link href="/cart" className="underline">
              Edit Cart
            </Link>
          </div>
          <div className="border-t mt-3 mb-2" />

          <div className="flex flex-col gap-4 max-h-50 overflow-y-auto p-2">
            {/* item */}

            {isLoadingCart ? (
              <p className="text-gray-500 text-center text-sm">
                Loading products...
              </p>
            ) : cart && cart?.data?.products?.length > 0 ? (
              cart?.data.products.map((product) => {
                const {
                  count,
                  price,
                  product: { _id: productId, imageCover, title },
                } = product;

                return (
                  <div className="pb-2 shadow" key={productId}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="relative w-[64px] h-[64px]">
                        <Image
                          src={imageCover}
                          alt={title}
                          fill
                          sizes="64px"
                          className="object-cover rounded"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm sm:text-base font-medium max-w-[300px]">
                            {turncateText(title, 50)}
                          </p>
                          <p className="text-sm sm:text-base font-semibold mr-2">
                            £{price}
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Qty: {count}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center text-sm">
                No products in cart
              </p>
            )}
          </div>

          <div className="border-t my-4" />

          {!isPromo ? (
            <a
              href="#"
              className="text-sm underline flex items-center gap-2"
              onClick={() => setIsPromo(true)}
            >
              <CiShoppingTag size={20} />
              Enter a promo code
            </a>
          ) : (
            <form className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Button
                type="submit"
                className="py-2 px-4 text-sm cursor-pointer"
              >
                Confirm
              </Button>
            </form>
          )}

          <div className="border-t my-4" />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{formatPrice(subTotal)}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              {delivery > 0 ? `EGP ${delivery}` : <p>Free</p>}
            </div>
            <div className="flex justify-between">
              <p>Sales Tax</p>
              <p>EGP {salesTax}</p>
            </div>
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <p>Total</p>
            <p>{formatPrice(total)}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex-1 flex flex-col">
              <button
                className={`w-full cursor-pointer bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:cursor-not-allowed`}
                onClick={form.handleSubmit((values) =>
                  handleCheckout(values, "cash")
                )}
                disabled={isLoading}
              >
                Cash Order
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Pay on delivery
              </p>
            </div>

            <div className="flex-1 flex flex-col">
              <button
                onClick={form.handleSubmit((values) =>
                  handleCheckout(values, "card")
                )}
                disabled={isLoading}
                className={`w-full cursor-pointer bg-[#f14c6d] text-white py-3 rounded-lg transition-colors hover:bg-[#ef6c86] disabled:cursor-not-allowed`}
              >
                Secure Checkout
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Pay with credit card
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
