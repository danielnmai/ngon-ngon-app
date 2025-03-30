import { Container, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { useContext } from "react";
import CartItem from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";
import { centsToDollar } from "../utils";

const Cart = () => {
  const { cartItems, getCartTotal } = useContext(CartContext);

  const total = getCartTotal();

  return (
    <Container size="lg">
      <Flex direction={{ base: "column", sm: "row" }}>
        <Container className="xs:w-4/6 w-full">
          <Stack>
            <Text>Cart</Text>
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
            <Group className="justify-between">
              <Text size="lg" fw={600}>
                Total
              </Text>
              <Text size="lg" fw={600}>
                {centsToDollar(total)}
              </Text>
            </Group>
          </Stack>
        </Container>
      </Flex>
    </Container>
  );
};

export default Cart;
