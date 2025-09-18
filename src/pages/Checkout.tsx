import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import OrderResult, { PickupInstructions } from "../components/OrderResult";
import { CartContext } from "../contexts/CartContext";
import Cart from "../pages//Cart";
import type { OrderResponse, PaymentStatus } from "../schemas/order";
import APIService from "../services/api";

const Checkout = () => {
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");
	const [order, setOrder] = useState<OrderResponse | null>(null);
	const API = new APIService();
	const paymentType = location.state?.paymentType || "CARD";
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
		clearCart();

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
				<Cart paymentType={paymentType} />
			</>
		);
	}

	return (
		<>
			<Cart paymentType={paymentType} />
			{paymentType === "CASH" && (
				<PickupInstructions title="Pick-up Instructions for Cash Payment" />
			)}
		</>
	);
};

export default Checkout;
