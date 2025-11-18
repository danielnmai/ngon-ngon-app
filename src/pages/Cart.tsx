import {
	Button,
	Container,
	Divider,
	Flex,
	Group,
	Stack,
	Text,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { useContext } from "react";
import CartItem from "../components/CartItem";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import type { Order } from "../schemas/order";
import APIService from "../services/api";
import { centsToDollar } from "../utils";

const Cart = () => {
	const { cartItems, getCartTotal } = useContext(CartContext);
	const { user } = useContext(AuthContext);
	const API = new APIService();

	const total = getCartTotal();

	const createCheckoutSession = async (order: Order) => {
		const response = await API.createCheckoutSession(order);

		return response.data;
	};

	const { mutate, data, isPending } = useMutation({
		mutationFn: createCheckoutSession,
		onError: (error) => {
			console.error("Mutation error:", error);
		},
	});

	const handleCardCheckout = () => {
		if (!user) return;

		const order: Order = {
			lineItems: cartItems,
			total,
			paymentType: "STRIPE",
			description: "Order from Ngon Ngon",
			userId: user.id,
		};

		mutate(order);
	};

	const handleCashCheckout = () => {
		console.log(
			"handling cash checkout. Customer is supposed to call the number to order",
		);
	};

	if (data?.url) {
		window.location.href = data.url;
	}

	return (
		<Container size="lg" className="my-4">
			<Flex direction={{ base: "column", sm: "row" }}>
				<Container className="xs:w-4/6 w-full">
					<Stack>
						<Text>My Cart</Text>
						<div>
							{cartItems.map((item) => (
								<Container key={item.foodId}>
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
									onClick={() => handleCashCheckout()}
									loading={isPending}
									component="a"
									href="tel:916-467-4047"
								>
									Pay with Cash
								</Button>
								<Button
									w="100%"
									size="lg"
									color="var(--color-primary)"
									onClick={() => handleCardCheckout()}
									loading={isPending}
									>
									Pay with Stripe
								</Button>
						</Stack>
					</Stack>
				</Container>
			</Flex>
		</Container>
	);
};

export default Cart;
