import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import OrderResult from "../components/OrderResult";
import { CartContext } from "../contexts/CartContext";
import Cart from "../pages//Cart";
import type { OrderResponse, PaymentStatus } from "../schemas/order";
import APIService from "../services/api";

const Checkout = () => {
	const [searchParams] = useSearchParams();
	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");
	const [order, setOrder] = useState<OrderResponse | null>(null);
	const API = new APIService();
	const { clearCart } = useContext(CartContext);

	const updateOrder = async ({
		orderId,
		paymentStatus,
	}: {
		orderId: number;
		paymentStatus: PaymentStatus;
	}) => {
		const { data } = await API.updateOrder({ id: orderId, paymentStatus });
		setOrder(data);

		if (paymentStatus === "SUCCESS") {
			clearCart();
		}

		return data;
	};

	const { mutate } = useMutation({
		mutationFn: updateOrder,
	});

	useEffect(() => {
		if (!orderId) return;

		if (success === "true") {
			mutate({ orderId: +orderId, paymentStatus: "SUCCESS" });
		} else if (success === "false") {
			mutate({ orderId: +orderId, paymentStatus: "FAILED" });
		}
	}, [mutate, success, orderId]);

	if (success === "true") {
		return <OrderResult success="true" order={order} />;
	}

	if (success === "false") {
		return (
			<>
				<OrderResult success="false" order={order} />
				<Cart />
			</>
		);
	}

	return <Cart />;
};

export default Checkout;
