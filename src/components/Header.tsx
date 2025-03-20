import { Anchor, Group, Indicator, Text } from "@mantine/core";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export const Header = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <header className="sticky top-0 h-12 bg-secondary w-full flex justify-between items-center z-10">
      <Text className="ml-4">Ngon Ngon Restaurant</Text>
      <Group className="mr-4">
        <Anchor variant="outline" href="#menu" className="no-underline">
          <Text className="text-primary hover:bg-primary hover:text-white p-2 rounded-sm">
            Order Now
          </Text>
        </Anchor>
        <div>
          {cartItems.length !== 0 && (
            <Indicator
              size={12}
              label={cartItems.length}
              color="var(--color-primary)"
            />
          )}
          <ShoppingCart size={26} color="var(--color-primary)" />
        </div>
      </Group>
    </header>
  );
};
