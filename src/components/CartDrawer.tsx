import { Drawer } from "@mantine/core";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const CartDrawer = () => {
  const { cartOpened, setCartOpened } = useContext(CartContext);

  const handleClose = () => {
    setCartOpened(false);
  };

  return (
    <Drawer opened={cartOpened} onClose={handleClose} position="right">
      <div>Order Summary</div>
    </Drawer>
  );
};

export default CartDrawer;
