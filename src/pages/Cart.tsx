import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { Lock } from "lucide-react";
import { useContext } from "react";
import CartItem from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";
import { centsToDollar } from "../utils";

const Cart = () => {
  const { cartItems, getCartTotal } = useContext(CartContext);

  const total = getCartTotal();

  return (
    <Container size="lg" className="my-4">
      <Flex direction={{ base: "column", sm: "row" }}>
        <Container className="xs:w-4/6 w-full">
          <Stack>
            <Text>My Cart</Text>
            <div>
              {cartItems.map((item, index) => (
                <Container key={index}>
                  <Divider className="my-4" />
                  <CartItem item={item} />
                </Container>
              ))}
            </div>
          </Stack>
        </Container>
        <Container className="xs:w-2/6 w-full">
          <Stack>
            <Text>Order Summary</Text>
            <Divider className="my-4" />
            <Stack align="center">
              <Group justify="space-between" w="100%">
                <Text size="lg" fw={600}>
                  Total
                </Text>
                <Text size="xl" fw={600}>
                  {centsToDollar(total)}
                </Text>
              </Group>
              <Button
                w="100%"
                size="lg"
                color="var(--color-primary)"
                onClick={() => {}}
              >
                Checkout
              </Button>
              <Group>
                <Lock />
                <Text>Secure checkout with Paypal</Text>
              </Group>
            </Stack>
          </Stack>
        </Container>
      </Flex>
    </Container>
  );
};

export default Cart;
