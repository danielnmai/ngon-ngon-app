import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import APIService from "../services/api";
import { OrderResponse, PaymentStatus } from "../schemas/order";
import { useMutation } from "@tanstack/react-query";
import {
  Anchor,
	Card,
	Center,
	Container,
	Flex,
	Group,
	Paper,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { centsToDollar } from "../utils";
import dayjs from "dayjs";

const Checkout = () => {
	const [searchParams] = useSearchParams();
	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");
	const [order, setOrder] = useState<OrderResponse | null>(null);
	const API = new APIService();

	const updateOrder = async ({
		orderId,
		paymentStatus,
	}: {
		orderId: number;
		paymentStatus: PaymentStatus;
	}) => {
		const { data } = await API.updateOrder({ id: orderId, paymentStatus });
		setOrder(data);

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
		return (
			<Center m={20}>
				<Stack align="center">
					<Paper withBorder p={20} m={20} shadow="md" miw={400}>
						<Center>
							<Title size={"h3"} my={20}>
								Your order is confirmed!
							</Title>
						</Center>
						<Flex>
							<Container>
								<Text my={2}>Order number:</Text>
								<Text my={2}>Order created:</Text>
								<Text my={2}>Payment type:</Text>
								<Text my={2}>Payment status:</Text>
								<Text my={2}>Total amount:</Text>
								<Text my={2}>Description:</Text>
							</Container>
							<Container>
								<Text my={2}>{order?.id}</Text>
								<Text my={2}>
									{order?.createdAt &&
										dayjs(order.createdAt).format("MMMM D, YYYY h:mm A")}
								</Text>
								<Text my={2}>{order?.paymentType}</Text>
								<Text my={2}>{order?.paymentStatus}</Text>
								<Text my={2}>
									{order?.total ? centsToDollar(order.total) : 0}
								</Text>
								<Text my={2}>{order?.description}</Text>
							</Container>
						</Flex>
					</Paper>

					<Container>
						<Title size={"h3"}>Pick-up Instructions</Title>
					</Container>
					<Title size={"h4"}>
						Please note: we cook to orders so please allow time for preparation.
						The typical wait time are 2 to 4 hours.
					</Title>
					<Text>
						Please call <Anchor fw={700} href="tel:916-467-4047">916-467-4047</Anchor> to confirm the order and pick-up
						time.
					</Text>
					<Text>
						The pick-up location is
						<Anchor fw={700}href="https://maps.app.goo.gl/G7v7VsbLLkScz6E78"> 5551 Martin Luther King Jr Blvd, Sacramento, CA 95820</Anchor>
					</Text>
				</Stack>
			</Center>
		);
	}

	if (success === "false") {
		return (
			<Center mt={20}>
				<Title size={"h3"}>Payment Failed. Please try again.</Title>
			</Center>
		);
	}
};

export default Checkout;
