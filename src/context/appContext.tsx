"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { CartType } from "@/types/cart.type";
import {
  addToCart,
  getAllCartItems,
  removeItemFromCart,
  updateCartItemCount,
} from "@/CartActions/CartActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/products.type";
import { signOut, useSession } from "next-auth/react";

import { OrdersType } from "@/types/orders.type";
import { getUserOrders } from "@/OrderActions/OrderActions";
import { WishlistItem } from "@/types/wishlist.type";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/WishlistActions/WishlistActions";
import { getUserToken } from "@/utils/getUserToken";

import { BrandType } from "@/types/brand.type";
import { CategoryType } from "@/types/categories.type";

interface AppContextType {
  cart: CartType | null;
  setCart: React.Dispatch<React.SetStateAction<CartType | null>>;
  orders: OrdersType[];
  setOrders: React.Dispatch<React.SetStateAction<OrdersType[]>>;
  brands: BrandType[];
  categories: CategoryType[];
  handleRemoveItem: (productId: string) => void;
  handleAddToCart: (productId: string) => void;

  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  handleLoggingOut: () => void;
  handleGetUserOrders: (userId: string | undefined) => void;
  handleAddToWishlist: (product: ProductType) => void;
  turncateText: (text: string, maxChar: number) => string;
  formatPrice: (value: number) => string;
  wishlist: WishlistItem[];
  setWishlist: React.Dispatch<React.SetStateAction<WishlistItem[]>>;

  cartLoading: string | null;
  wishlistLoading: string | null;
  globalLoading: boolean;
  cartPageLoading: boolean;
  wishlistPageLoading: boolean;
  ordersPageLoading: boolean;
  removingId: string | null;
  setRemovingId: React.Dispatch<React.SetStateAction<string | null>>;
  handleCountOperations: (
    type: "i" | "d",
    productId: string,
    count: number
  ) => void;
  loadingProductId: string | null;
  setLoadingProductId: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: {
    products: ProductType[];
    cart: CartType | null;
    wishlist: WishlistItem[];
    brands: BrandType[];
    categories: CategoryType[];
  };
}) => {
  const [products, setProducts] = useState<ProductType[]>(initialData.products);
  const [cart, setCart] = useState<CartType | null>(initialData.cart);
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(
    initialData.wishlist
  );
  const [brands, setBrands] = useState<BrandType[]>(initialData.brands);
  const [categories, setCategories] = useState<CategoryType[]>(
    initialData.categories
  );

  const [globalLoading, setGlobalLoading] = useState(false);
  const [cartPageLoading, setCartPageLoading] = useState(false);
  const [wishlistPageLoading, setWishlistPageLoading] = useState(false);
  const [ordersPageLoading, setOrdersPageLoading] = useState(false);

  const [cartLoading, setCartLoading] = useState<string | null>(null);
  const [wishlistLoading, setWishlistLoading] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const { status } = useSession();

  const router = useRouter();

  const initUserData = useCallback(async () => {
    try {
      setGlobalLoading(true);
      setCartPageLoading(true);
      setWishlistPageLoading(true);
      setOrdersPageLoading(true);

      const [cartData, wishlistData] = await Promise.all([
        fetchCart(),
        fetchWishlist(),
      ]);

      if (cartData) {
        setCart(cartData);

        if (cartData.data.products.length > 0) {
          setCartPageLoading(false);
        }
      } else {
        setCartPageLoading(false);
      }

      if (wishlistData) {
        setWishlist(wishlistData);

        if (wishlistData.length > 0) {
          setWishlistPageLoading(false);
        }
      } else {
        setWishlistPageLoading(false);
      }

      setOrdersPageLoading(false);
    } catch (err) {
      console.error("Failed to fetch cart and wishlist:", err);
      setCartPageLoading(false);
      setWishlistPageLoading(false);
      setOrdersPageLoading(false);
    } finally {
      setGlobalLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      initUserData();
    } else if (status === "unauthenticated") {
      setCart(null);
      setWishlist([]);
    }
  }, [status]);

  async function fetchCart() {
    try {
      const data = await getAllCartItems();
      return data ?? null;
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      return null;
    }
  }

  async function fetchWishlist() {
    try {
      const wishlistData = await getWishlist();
      return wishlistData?.data ?? [];
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      return [];
    }
  }

  async function handleRemoveItem(productId: string) {
    if (removingId) return;
    setRemovingId(productId);
    try {
      const data = await removeItemFromCart(productId);

      if (data.status === "success") {
        toast.success("Product removed from cart");
        setCart(data);

        if (data.data.products.length === 0) {
          setCartPageLoading(true);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to remove product");
      }
    } finally {
      setRemovingId(null);
    }
  }

  async function handleAddToCart(productId: string) {
    if (cartLoading) return;

    setCartLoading(productId);

    try {
      const token = await getUserToken();
      if (!token) {
        toast.error("You must be logged in to add items to Cart.");
        router.push("/login");
        return;
      }
      const result = await addToCart(productId);
      if (result.status !== "success") {
        throw new Error(result.message || "Failed to add product to cart");
      }
      toast.success(result.message);

      const cart = await getAllCartItems();
      setCart(cart);

      if (cart && cart.data.products.length > 0) {
        setCartPageLoading(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setCartLoading(null);
    }
  }

  async function handleAddToWishlist(product: ProductType) {
    if (wishlistLoading) return;

    setWishlistLoading(product._id);
    try {
      const token = await getUserToken();
      if (!token) {
        toast.error("You must be logged in to add items to Wishlist.");
        router.push("/login");
        return;
      }

      const isAlreadyWishlisted = wishlist.some(
        (item) => item._id === product._id
      );

      if (isAlreadyWishlisted) {
        const data = await removeFromWishlist(product._id);

        if (data) {
          toast.success("Product removed from your wishlist!");
          setWishlist((prev) => {
            const newWishlist = prev.filter((item) => item._id !== product._id);

            if (newWishlist.length === 0) {
              setWishlistPageLoading(true);
            }
            return newWishlist;
          });
        }
      } else {
        const data = await addToWishlist(product._id);

        if (data) {
          toast.success("Product added successfully to your wishlist!");
          setWishlist((prev) => {
            const newWishlist = [...prev, product as WishlistItem];

            if (newWishlist.length > 0) {
              setWishlistPageLoading(false);
            }
            return newWishlist;
          });
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setWishlistLoading(null);
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
      setOrdersPageLoading(true);
      const orders = await getUserOrders(userId);
      setOrders(orders);

      if (orders && orders.length > 0) {
        setOrdersPageLoading(false);
      } else {
        setOrdersPageLoading(false);
      }
    } catch (err: unknown) {
      console.error("Failed to fetch Orders:", err);
      setOrdersPageLoading(false);

      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
    }
  }

  async function handleCountOperations(
    type: "i" | "d",
    productId: string,
    count: number
  ) {
    try {
      setLoadingProductId(productId);
      let newCount = count;

      if (type === "i") newCount = count + 1;
      else if (type === "d") newCount = count - 1;

      const data = await updateCartItemCount(productId, newCount);

      if (data.status === "success") {
        setCart(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Failed to update product count");
    } finally {
      setLoadingProductId(null);
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
        handleAddToWishlist,
        cartLoading,
        wishlistLoading,
        globalLoading,
        cartPageLoading,
        wishlistPageLoading,
        ordersPageLoading,
        removingId,
        setRemovingId,
        handleCountOperations,
        loadingProductId,
        setLoadingProductId,
        brands,
        categories,
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
