import { Anchor, Group, Indicator, Text } from "@mantine/core";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export const Header = () => {
  const { cartItems, setCartOpened } = useContext(CartContext);

  const openCart = () => {
    setCartOpened(true);
  };

  return (
    <header className="sticky top-0 h-12 bg-secondary w-full flex justify-between items-center z-10">
      <Text className="ml-4">Ngon Ngon Restaurant</Text>
      <Group className="mr-4">
        <Anchor variant="outline" href="#menu" className="no-underline">
          <Text className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded-sm border-1">
            Order Now
          </Text>
        </Anchor>
        <div onClick={openCart} className="cursor-pointer">
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
