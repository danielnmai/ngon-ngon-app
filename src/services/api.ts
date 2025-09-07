import axios, { type AxiosInstance, type AxiosPromise } from "axios";
import type { CartItemType } from "../contexts/CartContext";
import type { LoginRequest, LoginResponse, TokensType } from "../schemas/auth";
import type { Food } from "../schemas/menu";
import { Order } from "../pages/Cart";
import { PaymentStatus } from "../schemas/order";

class APIService {
	BASE_URL = "http://localhost:3000/v1";
	axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: this.BASE_URL,
			headers: {
				"Content-Type": "application/json",
			},
		});

		this.axiosInstance.interceptors.request.use((request) => {
			const storedTokens = localStorage.getItem("tokens");

			if (!storedTokens) return request;

			// get the JWT from local storage
			const tokens: TokensType = JSON.parse(storedTokens);
			const jwtToken = tokens.id_token;
			request.headers.Authorization = `Bearer ${jwtToken}`;

			return request;
		});
	}

	login(payload: LoginRequest): AxiosPromise<LoginResponse> {
		return this.axiosInstance.post("/auth/login", payload);
	}

	fetchMenu(): AxiosPromise<Food[]> {
		return this.axiosInstance.get("/foods");
	}

	fetchUser(userId: string) {
		return this.axiosInstance.get(`/users/${userId}`);
	}

	createCheckoutSession(order: Order) {
		return this.axiosInstance.post("/orders/checkout-sessions", order);
	}

	updateOrderPaymentStatus(orderId: string, paymentStatus: PaymentStatus) {
		return this.axiosInstance.patch(`/orders/${orderId}`, { paymentStatus });
	}
}

export default APIService;
