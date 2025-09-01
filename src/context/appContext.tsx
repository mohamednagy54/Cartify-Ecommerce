"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ProductType } from "@/types/products.type";

interface CartItem extends ProductType {
  quantity: number;
}

interface AppContextType {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  searchValue: string;
  setSearchValue: (value: string) => void;
  cart: CartItem[];
  addToCart: (product: ProductType, quantity: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: ProductType, quantity: number = 1) {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item._id === product._id);

      if (existingProduct) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: quantity }];
      }
    });
  }

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        searchValue,
        setSearchValue,
        cart,
        addToCart,
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
