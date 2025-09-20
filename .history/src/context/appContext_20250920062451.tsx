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

interface AppContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
  cart: CartType | null;
  setCart: React.Dispatch<React.SetStateAction<CartType | null>>;
  orders: OrdersType[];
  setOrders: React.Dispatch<React.SetStateAction<OrdersType[]>>;
  handleRemoveItem: (productId: string) => void;
  handleAddToCart: (productId: string) => void;
  filterByBrand: (brandName: string) => void;
  filterByCategory: (categoryName: string) => void;
  filterBySort: (value: string) => void;
  filterByPrice: (value: number | undefined, type: "min" | "max") => void;

  filteredProducts: ProductType[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  handleLoggingOut: () => void;
  handleGetUserOrders: (userId: string | undefined) => void;
  handleAddToWishlist: (product: ProductType) => void;
  turncateText: (text: string, maxChar: number) => string;
  formatPrice: (value: number) => string;
  wishlist: WishlistItem[];
  setWishlist: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
  priceFilter: { min?: number; max?: number };
  setPriceFilter: React.Dispatch<
    React.SetStateAction<{ min?: number; max?: number }>
  >;
  sortValue: string;
  cartLoading: string | null;
  wishlistLoading: string | null;
  globalLoading: boolean;
  cartPageLoading: boolean;
  wishlistPageLoading: boolean;
  ordersPageLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartType | null>(null);
  const [orders, setOrders] = useState<OrdersType[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [sortValue, setSortValue] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<{
    min?: number;
    max?: number;
  }>({});
  const [globalLoading, setGlobalLoading] = useState(false);
  const [cartPageLoading, setCartPageLoading] = useState(false);
  const [wishlistPageLoading, setWishlistPageLoading] = useState(false);
  const [ordersPageLoading, setOrdersPageLoading] = useState(false);

  const [cartLoading, setCartLoading] = useState<string | null>(null);
  const [wishlistLoading, setWishlistLoading] = useState<string | null>(null);

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
        // إذا كان هناك منتجات في الـ cart، اخفي الـ loading
        if (cartData.data.products.length > 0) {
          setCartPageLoading(false);
        }
      } else {
        setCartPageLoading(false);
      }

      if (wishlistData) {
        setWishlist(wishlistData);
        // إذا كان هناك منتجات في الـ wishlist، اخفي الـ loading
        if (wishlistData.length > 0) {
          setWishlistPageLoading(false);
        }
      } else {
        setWishlistPageLoading(false);
      }

      // Orders loading يمكن إدارته منفصلاً عند الحاجة
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
  }, [status, initUserData]);

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
    try {
      const data = await removeItemFromCart(productId);

      if (data.status === "success") {
        toast.success("Product removed from cart");
        setCart(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to remove product");
      }
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
      // إذا تم إضافة منتج للـ cart، اخفي الـ loading
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
      const orders = await getUserOrders(userId);
      setOrders(orders);
    } catch (err: unknown) {
      console.error("Failed to fetch Orders:", err);

      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
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

  // Filteration methods
  function filterByBrand(brandName: string) {
    if (brandName === "all") {
      setFilteredProducts(products);
      setSortValue("");
    } else {
      setFilteredProducts(
        products.filter((product) => product.brand.slug === brandName)
      );

      setSortValue("");
    }
  }
  function filterByCategory(categoryName: string) {
    if (categoryName === "all") {
      setFilteredProducts(products);
      setSortValue("");
    } else {
      setFilteredProducts(
        products.filter((product) => product.category.slug === categoryName)
      );
      setSortValue("");
    }
  }

  function filterByPrice(value: number | undefined, type: "min" | "max") {
    const newFilter = { [type]: value };
    setPriceFilter(newFilter);

    if (!newFilter.min && !newFilter.max) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) => {
      if (newFilter.min != null && product.price < newFilter.min) return false;
      if (newFilter.max != null && product.price > newFilter.max) return false;
      return true;
    });

    setFilteredProducts(filtered);
  }

  function filterBySort(value: string) {
    setSortValue(value);
    let sortedProducts = [...filteredProducts];

    switch (value) {
      case "asc price":
        sortedProducts.sort((a, b) => a.price - b.price);

        break;
      case "desc price":
        sortedProducts.sort((a, b) => b.price - a.price);

        break;
      case "asc lastUpdated":
        sortedProducts.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        break;
      case "desc lastUpdated":
        sortedProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        break;

      default:
        sortedProducts = [...products];
    }

    setFilteredProducts(sortedProducts);
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
        handleAddToWishlist,
        filterByBrand,
        filteredProducts,
        setFilteredProducts,
        filterByCategory,
        filterBySort,
        sortValue,
        filterByPrice,
        priceFilter,
        setPriceFilter,
        cartLoading,
        wishlistLoading,
        globalLoading,
        cartPageLoading,
        wishlistPageLoading,
        ordersPageLoading,
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
