import { CartItemType } from "../contexts/CartContext";

export type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED";

export type Order = {
	lineItems: CartItemType[];
	total: number;
	paymentType: "CASH" | "STRIPE";
	description: string;
	userId: number;
	paymentStatus: PaymentStatus;
};
