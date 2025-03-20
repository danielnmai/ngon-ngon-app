import { createContext, useEffect, useState } from "react";

export type CartItem = {
  quantity: number;
  size: Size;
  foodId: number;
  specialRequest?: string;
  totalPrice: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

import { ReactNode } from "react";
import { Size } from "../utils/constants";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const storedCartItems = localStorage.getItem("cartItems");
  const [cartItems, setCartItems] = useState<CartItem[]>(
    storedCartItems ? JSON.parse(storedCartItems) : []
  );

  const addItem = (item: CartItem) => {
    const itemInCart = cartItems.find(
      (cartItem) =>
        cartItem.foodId === item.foodId && cartItem.size === item.size
    );

    if (itemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.foodId === item.foodId && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeItem = (item: CartItem) => {
    const itemInCart = cartItems.find(
      (cartItem) =>
        cartItem.foodId === item.foodId && cartItem.size === item.size
    );
    if (itemInCart?.quantity == 1) {
      setCartItems(
        cartItems.filter(
          (cartItem) =>
            cartItem.foodId !== item.foodId || cartItem.size !== item.size
        )
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.foodId === item.foodId && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
