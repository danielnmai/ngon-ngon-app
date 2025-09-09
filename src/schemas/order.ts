import type { CartItemType } from "../contexts/CartContext";

export type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED";

export type Order = {
	id?: number;
	lineItems?: CartItemType[];
	total?: number;
	paymentType?: "CASH" | "STRIPE";
	description?: string;
	userId?: number;
	paymentStatus?: PaymentStatus;
};

/*
{
  "id": 3,
  "createdAt": "2025-09-07T23:21:10.110Z",
  "updatedAt": "2025-09-08T21:52:21.679Z",
  "description": "order from user 6",
  "userId": 6,
  "total": 1000,
  "paymentStatus": "SUCCESS",
  "paymentType": "CASH"
}
*/
export type OrderResponse = {
	id: number;
	createdAt: string;
	updatedAt: string;
	description: string;
	userId: number;
	total: number;
	paymentStatus: PaymentStatus;
	paymentType: "CASH" | "STRIPE";
};
