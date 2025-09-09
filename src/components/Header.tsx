import { Anchor, Avatar, Group, Indicator, Text } from "@mantine/core";
import { type TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import APIService from "../services/api";

export type UserTokenResponse = Omit<
	TokenResponse,
	"error" | "error_description" | "error_uri"
>;

export type GoogleUser = {
	email: string;
	family_name: string;
	given_name: string;
	id: string;
	name: string;
	picture: string;
	verified_email: boolean;
};

export const Header = () => {
	const { cartItems, setCartOpened, clearCart } = useContext(CartContext);
	const { loginUser, user, logoutUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const openCart = () => {
		if (location.pathname !== "/") {
			return;
		}

		setCartOpened(true);
	};

	const handleLogout = () => {
		logoutUser();
		clearCart();
	};

	const handleLogin = useGoogleLogin({
		onSuccess: async ({ code }) => {
			const API = new APIService();

			try {
				const { data } = await API.login({ code });
				const { tokens, user } = data;

				loginUser(user, tokens);
			} catch (error) {
				console.error(error);
			}
		},
		onError: (error) => {
			console.log("error ", error);
		},
		flow: "auth-code",
	});

	const onGoogleLogin = () => handleLogin();

	return (
		<header className="sticky shrink-0 top-0 p-2 bg-secondary w-full flex justify-between items-center z-10">
			<Text className="ml-4 cursor-pointer" onClick={() => navigate("/")}>
				Ngon Ngon
			</Text>
			<Group className="mr-4">
				<Anchor variant="outline" href="#menu" className="no-underline mr-4">
					<Text className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded-sm border-1">
						Order Now
					</Text>
				</Anchor>
				{user ? (
					<Group>
						<img
							src={user.picture}
							className="w-8 rounded-2xl"
							alt="user-profile-picture"
							referrerPolicy="no-referrer"
						/>
						<Text
							className="text-primary hover:opacity-75 border-primary p-1 cursor-pointer"
							onClick={handleLogout}
						>
							Log Out
						</Text>
					</Group>
				) : (
					<Group className="cursor-pointer">
						<Avatar size="sm" color="var(--color-primary)" />
						<Text
							className="text-primary hover:opacity-75 border-primary p-1"
							onClick={onGoogleLogin}
						>
							Log In
						</Text>
					</Group>
				)}
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
