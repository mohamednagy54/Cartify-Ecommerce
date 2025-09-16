"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CartType } from "@/types/cart.type";
import {
  addToCart,
  getAllCartItems,
  removeItemFromCart,
} from "@/CartActions/CartActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/products.type";
import { signOut, useSession } from "next-auth/react";

import { OrdersType } from "@/types/orders.type";
import { getUserOrders } from "@/OrderActions/OrderActions";
import { WishlistItem } from "@/types/wishlist.type";
import { getWishlist } from "@/WishlistActions/WishlistActions";

interface AppContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
  cart: CartType | null;
  setCart: React.Dispatch<React.SetStateAction<CartType | null>>;
  orders: OrdersType[];
  setOrders: React.Dispatch<React.SetStateAction<OrdersType[]>>;
  handleRemoveItem: (productId: string) => void;
  handleAddToCart: (productId: string) => void;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  handleLoggingOut: () => void;
  handleGetUserOrders: (userId: string | undefined) => void;
  turncateText: (text: string, maxChar: number) => string;
  formatPrice: (value: number) => string;
  wishlist: WishlistItem[];
  setWishlist: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartType | null>(null);
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      fetchCart();
      fetchWishlist();
    } else if (status === "unauthenticated") {
      setCart(null);
      setWishlist([]);
    }
  }, [status]);

  async function fetchCart() {
    try {
      const data = await getAllCartItems();
      if (data) setCart(data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }

  async function fetchWishlist() {
    try {
      const wishlistData = await getWishlist();
      if (wishlistData) setWishlist(wishlistData.data);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  }

  async function handleRemoveItem(productId: string) {
    try {
      const data = await removeItemFromCart(productId);

      if (data.status === "success") {
        toast.success("Product removed from cart");
        setCart(data);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to remove product");
    }
  }

  async function handleAddToCart(productId: string) {
    try {
      const result = await addToCart(productId);
      if (result.status !== "success") {
        throw new Error(result.message || "Failed to add product to cart");
      }
      toast.success(result.message);
      const cart = await getAllCartItems();
      setCart(cart);
    } catch (err: any) {
      if (err.message === "User is not authenticated") {
        toast.error("You must be logged in to add items to the cart.");
        router.push("/login");
      } else {
        toast.error(err.message || "Something went wrong.");
      }
    }
  }

  async function handleLoggingOut() {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  }

  async function handleGetUserOrders(userId: string | undefined) {
    try {
      const orders = await getUserOrders(userId);
      setOrders(orders);
    } catch (err: any) {
      console.error("Failed to fetch Orders:", err);
    }
  }

  function turncateText(text: string, maxChars: number) {
    if (text.length <= maxChars) return text;

    return text.slice(0, maxChars) + "...";
  }

  function formatPrice(value: number) {
    return new Intl.NumberFormat("En-EG", {
      style: "currency",
      currency: "EGP",
    }).format(value);
  }

  return (
    <AppContext.Provider
      value={{
        searchValue,
        setSearchValue,
        cart,
        setCart,
        handleRemoveItem,
        handleAddToCart,
        products,
        setProducts,
        handleLoggingOut,
        handleGetUserOrders,
        orders,
        setOrders,
        turncateText,
        formatPrice,
        wishlist,
        setWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be inside AppProvider");
  return ctx;
};
