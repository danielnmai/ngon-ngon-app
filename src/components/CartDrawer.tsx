import {
  Button,
  Container,
  Divider,
  Drawer,
  ScrollArea,
  Stack,
} from "@mantine/core";
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
      size={600}
      title={`Cart (${cartItems.length} items)`}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Stack className="items-center">
        <ScrollArea className="h-[calc(100dvh-250px)]">
          {cartItems.map((item, index) => (
            <Container key={index}>
              <Divider className="my-4" />
              <CartItem item={item} />
            </Container>
          ))}
        </ScrollArea>
        <Container className=" bg-white sticky bottom-0 w-full">
          <Stack>
            <Button>Checkout</Button>
            <Button>View Cart</Button>
          </Stack>
        </Container>
      </Stack>
    </Drawer>
  );
};

export default CartDrawer;
