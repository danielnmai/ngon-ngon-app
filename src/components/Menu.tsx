import { Container, SimpleGrid, Title } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import APIService from "../services/api";
import MenuItem from "./MenuItem";

const fetchMenu = async () => {
	const api = new APIService();
	const { data } = await api.fetchMenu();
	return data;
};

const Menu = () => {
	const { isPending, error, data } = useQuery({
		queryKey: ["fetchMenu"],
		queryFn: fetchMenu,
	});

	if (isPending) return <div>Loading...</div>;

	if (error) return <div>Error: {error.message}</div>;

	return (
		<section className="flex justify-center items-center">
			<Container className="pt-12 ml-4 mr-4 h-full">
				<Title className="font-cormorant text-primary" order={1}>
					ORDER ONLINE
				</Title>
				<Title order={3} className="font-cormorant text-primary">
					We cook fresh for each order, minimum preparation time is 3 hours.
				</Title>
				<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
					{data.map((foodItem) => (
						<MenuItem food={foodItem} key={foodItem.id} />
					))}
				</SimpleGrid>
			</Container>
		</section>
	);
};

export default Menu;
