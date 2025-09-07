import { Group, Text } from "@mantine/core";
import { Copyright } from "lucide-react";

export const Footer = () => {
	return (
		<footer className="shrink-0 p-2 bg-secondary">
			<Group className="flex justify-center items-center h-full">
				<Copyright />
				<Text>2025 by Nghia Mai. All Rights Reserved</Text>
			</Group>
		</footer>
	);
};
