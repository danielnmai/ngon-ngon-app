import { useEffect } from "react";
import { useSearchParams } from "react-router";
import APIService from "../services/api";
import { PaymentStatus } from "../schemas/order";
import { useMutation } from "@tanstack/react-query";
import { Container, Text } from "@mantine/core";

const Checkout = () => {
	const [searchParams] = useSearchParams();
	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");
	const API = new APIService();

	const updateOrderPaymentStatus = ({
		orderId,
		paymentStatus,
	}: {
		orderId: string;
		paymentStatus: PaymentStatus;
	}) => API.updateOrderPaymentStatus(orderId, paymentStatus);

	const { mutate } = useMutation({
		mutationFn: updateOrderPaymentStatus,
	});

	useEffect(() => {
    if(!orderId) return;

		if (success === "true") {
			mutate({ orderId, paymentStatus: "SUCCESS" });
		} else if (success === "false") {
			mutate({ orderId, paymentStatus: "FAILED" });
		}
	}, [mutate, success, orderId]);

	if (success === "true") {
		return (
			<Container mt={10}>
				<Text>Payment Successful. Please check your email for the receipt.</Text>
			</Container>
		);
	}

	if (success === "false") {
		return (
			<Container mt={20}>
				<Text>Payment Failed. Please try again.</Text>
			</Container>
		);
  }
};

export default Checkout;
