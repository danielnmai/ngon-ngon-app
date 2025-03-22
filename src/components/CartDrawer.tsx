import { Drawer } from "@mantine/core";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";

const CartDrawer = () => {
  const { cartOpened, setCartOpened, cartItems } = useContext(CartContext);

  const handleClose = () => {
    setCartOpened(false);
  };

  return (
    <Drawer opened={cartOpened} onClose={handleClose} position="right">
      <div>Order Summary</div>
      {cartItems.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
    </Drawer>
  );
};

export default CartDrawer;
