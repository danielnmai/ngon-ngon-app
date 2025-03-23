import { Divider, Drawer } from "@mantine/core";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";

const CartDrawer = () => {
  const { cartOpened, setCartOpened, cartItems } = useContext(CartContext);

  const handleClose = () => {
    setCartOpened(false);
  };

  const handleCheckout = () => {};

  return (
    <Drawer
      opened={cartOpened}
      onClose={handleClose}
      position="right"
      size={500}
    >
      <div>Order Summary</div>
      {cartItems.map((item, index) => (
        <div key={index}>
          <CartItem item={item} />
          <Divider my={8} />
        </div>
      ))}
    </Drawer>
  );
};

export default CartDrawer;
