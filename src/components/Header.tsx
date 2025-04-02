import { Anchor, Button, Group, Indicator, Text } from "@mantine/core";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../contexts/CartContext";
import APIService from "../services/api";

export type UserTokenResponse = Omit<
  TokenResponse,
  "error" | "error_description" | "error_uri"
>;

export type User = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export const Header = () => {
  const { cartItems, setCartOpened } = useContext(CartContext);
  const navigate = useNavigate();

  const openCart = () => {
    setCartOpened(true);
  };

  const handleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      const API = new APIService();
      const { email, name, picture } = await APIService.fetchGoogleUserData(
        access_token
      );

      try {
        const { data } = await API.login({ email, name, picture });
        API.setHeaderToken(data.accessToken);
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
      console.log("error ", error);
    },
  });

  const onGoogleLogin = () => handleLogin();

  return (
    <header className="sticky shrink-0 top-0 p-2 bg-secondary w-full flex justify-between items-center z-10">
      <Text className="ml-4 cursor-pointer" onClick={() => navigate("/")}>
        Ngon Ngon
      </Text>
      <Group className="mr-4">
        <Anchor variant="outline" href="#menu" className="no-underline">
          <Text className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded-sm border-1">
            Order Now
          </Text>
        </Anchor>
        <Button onClick={onGoogleLogin}>Log in</Button>
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
