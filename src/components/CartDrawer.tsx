import {
	Button,
	Center,
	Container,
	Divider,
	Drawer,
	Group,
	Modal,
	ScrollArea,
	Stack,
	Text,
} from "@mantine/core";
import { Lock } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { set } from "zod";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { centsToDollar } from "../utils";
import { useHandleLogin } from "../utils/hooks";
import CartItem from "./CartItem";

const CartDrawer = () => {
	const { cartOpened, setCartOpened, cartItems, getCartTotal } =
		useContext(CartContext);
	const [modalOpened, setModalOpened] = useState(false);
	const { user, loginUser } = useContext(AuthContext);
	const { loginWithGoogle } = useHandleLogin(loginUser);

	useEffect(() => {
		if (user) {
			setModalOpened(false);
		}
	}, [user]);

	const navigate = useNavigate();

	const handleClose = () => {
		setCartOpened(false);
	};

	const handleLoginWithGoogle = () => {
		loginWithGoogle();
	};

	const handleCheckoutWithCash = () => {
		if (!user) {
			setModalOpened(true);
			return;
		}
		navigate("/checkout", { state: { paymentType: "CASH" } });
		setCartOpened(false);
	};

	const handleCheckoutWithCard = () => {
		if (!user) {
			setModalOpened(true);
			return;
		}
		navigate("/checkout", { state: { paymentType: "CARD" } });
		setCartOpened(false);
	};

	const cartTotal = getCartTotal();

	return (
		<>
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
				classNames={{
					content: "bg-secondary",
					header: "bg-secondary",
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
							<Button
								w="100%"
								size="lg"
								color="var(--color-primary)"
								onClick={handleCheckoutWithCash}
							>
								Pay with Cash
							</Button>
							<Button
								w="100%"
								size="lg"
								variant="outline"
								color="var(--color-primary)"
								onClick={handleCheckoutWithCard}
							>
								Pay with Card
							</Button>
							<Group>
								<Lock />
								<Text>Secure checkout with Stripe</Text>
							</Group>
						</Stack>
					</Container>
				</Stack>
			</Drawer>
			<Modal
				opened={modalOpened}
				onClose={() => setModalOpened(false)}
				centered
				classNames={{
					header: "bg-secondary",
					content: "bg-secondary",
				}}
			>
				<Container>
					<Text mb={20}>Please log in or sign up to proceed to checkout.</Text>
					<Center>
						<Button
							size="lg"
							color="var(--color-primary)"
							onClick={handleLoginWithGoogle}
							loaderProps={{ type: "dots" }}
						>
							Log in with Google
						</Button>
					</Center>
				</Container>
			</Modal>
		</>
	);
};

export default CartDrawer;
