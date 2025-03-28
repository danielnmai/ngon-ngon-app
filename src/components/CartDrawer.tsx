import {
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Lock } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { centsToDollar } from "../utils";
import CartItem from "./CartItem";

const CartDrawer = () => {
  const { cartOpened, setCartOpened, cartItems, getCartTotal } =
    useContext(CartContext);

  const handleClose = () => {
    setCartOpened(false);
  };

  const handleCheckout = () => {};

  const cartTotal = getCartTotal();

  return (
    <Drawer
      opened={cartOpened}
      onClose={handleClose}
      position="right"
      size={600}
      title={`Cart (${cartItems.length} items)`}
      scrollAreaComponent={ScrollArea.Autosize}
      closeButtonProps={{
        size: "lg",
      }}
    >
      <Stack className="items-center">
        <ScrollArea className="h-[calc(100dvh-350px)]">
          {cartItems.map((item, index) => (
            <Container key={index}>
              <Divider className="my-4" />
              <CartItem item={item} />
            </Container>
          ))}
        </ScrollArea>
        <Container className="sticky bottom-0 w-full">
          <Divider className="my-4" />
          <Stack align="center">
            <Group justify="space-between" w="100%">
              <Text size="lg" fw={600}>
                Total
              </Text>
              <Text size="xl" fw={600}>
                {centsToDollar(cartTotal)}
              </Text>
            </Group>
            <Button w="100%" size="lg" color="var(--color-primary)">
              Checkout
            </Button>
            <Button
              w="100%"
              size="lg"
              variant="outline"
              color="var(--color-primary)"
            >
              View Cart
            </Button>
            <Group>
              <Lock /> Secure checkout with Paypal
              <Text></Text>
            </Group>
          </Stack>
        </Container>
      </Stack>
    </Drawer>
  );
};

export default CartDrawer;
