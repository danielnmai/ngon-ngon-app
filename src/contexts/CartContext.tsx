import { createContext, useEffect, useState } from "react";

export type CartItemType = {
  quantity: number;
  size: Size;
  foodId: number;
  specialRequest?: string;
  totalPrice: number;
  name: string;
  optionPrice: number;
  optionQuantity: number;
};

export type CartContextType = {
  cartItems: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (item: CartItemType) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  cartOpened: boolean;
  setCartOpened: (opened: boolean) => void;
  incrementItemQty: (item: CartItemType) => void;
  decrementItemQty: (item: CartItemType) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  cartOpened: false,
  setCartOpened: () => {},
  incrementItemQty: () => {},
  decrementItemQty: () => {},
});

import { ReactNode } from "react";
import { Size } from "../utils/constants";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const storedCartItems = localStorage.getItem("cartItems");
  const [cartItems, setCartItems] = useState<CartItemType[]>(
    storedCartItems ? JSON.parse(storedCartItems) : []
  );
  const [cartOpened, setCartOpened] = useState(false);

  const incrementItemQty = (item: CartItemType) => {
    const itemInCart = cartItems.find(
      (cartItem) =>
        cartItem.foodId === item.foodId && cartItem.size === item.size
    );

    if (itemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.foodId === item.foodId && cartItem.size === item.size
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalPrice: cartItem.totalPrice + item.optionPrice,
              }
            : cartItem
        )
      );
    }
  };

  const decrementItemQty = (item: CartItemType) => {
    const itemInCart = cartItems.find(
      (cartItem) =>
        cartItem.foodId === item.foodId && cartItem.size === item.size
    );

    if (itemInCart && itemInCart?.quantity > item.optionQuantity) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.foodId === item.foodId && cartItem.size === item.size
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
                totalPrice: cartItem.totalPrice - item.optionPrice,
              }
            : cartItem
        )
      );
    }
  };

  const addItem = (item: CartItemType) => {
    const itemInCart = cartItems.find(
      (cartItem) =>
        cartItem.foodId === item.foodId && cartItem.size === item.size
    );

    if (itemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.foodId === item.foodId && cartItem.size === item.size
            ? {
                ...cartItem,
                quantity: item.quantity,
                totalPrice: item.optionPrice * item.quantity,
              }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeItem = (item: CartItemType) => {
    setCartItems(
      cartItems.filter(
        (cartItem) =>
          !(cartItem.foodId === item.foodId && cartItem.size === item.size)
      )
    );
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
      value={{
        cartItems,
        incrementItemQty,
        decrementItemQty,
        clearCart,
        getCartTotal,
        cartOpened,
        setCartOpened,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
