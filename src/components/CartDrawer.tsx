import { Divider, Drawer } from "@mantine/core";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";

const CartDrawer = () => {
  const { cartOpened, setCartOpened, cartItems } = useContext(CartContext);

  const handleClose = () => {
    setCartOpened(false);
  };

  return (
    <Drawer
      opened={cartOpened}
      onClose={handleClose}
      position="right"
      size={500}
    >
      <div>Order Summary</div>
      {cartItems.map((item, index) => (
        <>
          <CartItem key={index} item={item} />
          <Divider my={8} />
        </>
      ))}
    </Drawer>
  );
};

export default CartDrawer;
