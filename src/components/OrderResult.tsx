import {
	Anchor,
	Center,
	Container,
	Flex,
	Paper,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import dayjs from "dayjs";
import type { OrderResponse } from "../schemas/order";
import { centsToDollar } from "../utils";

type OrderResultProps = {
	success: string | null;
	order: OrderResponse | null;
};

export const PickupInstructions = ({ title }: { title: string }) => {
	return (
		<Container size="lg" my={30}>
			<Title size={"h2"} className="font-bebas font-extrabold">
				{title}
			</Title>
			<Text size="lg" my={10}>
				Please note: we cook to orders so please allow time for preparation. The
				typical wait time are 2 to 4 hours.
			</Text>
			<Text size="lg">
				Please call <Anchor href="tel:916-467-4047">916-467-4047</Anchor> to
				confirm the order and pick-up time.
			</Text>
			<Text size="lg" mt={10}>
				The pick-up location is
				<Anchor href="https://maps.app.goo.gl/G7v7VsbLLkScz6E78">
					{" "}
					5551 Martin Luther King Jr Blvd, Sacramento, CA 95820
				</Anchor>
			</Text>
		</Container>
	);
};

const OrderResult = ({ success, order }: OrderResultProps) => {
	if (!success || !order) return null;

	if (success === "true") {
		return (
			<Center m={20}>
				<Stack align="center">
					<Paper withBorder p={20} m={20} shadow="md" miw={400}>
						<Center>
							<Title size={"h1"} my={20} className="font-bebas">
								Your order is paid!
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
					<PickupInstructions title="Pick-up Instructions" />
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

export default OrderResult;
