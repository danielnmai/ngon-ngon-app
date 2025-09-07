import dayjs from "dayjs";
import { createContext, type ReactNode, useEffect, useState } from "react";
import type { TokensType } from "../schemas/auth";
import type { UserType } from "../schemas/user";

export type AuthContextType = {
	user: UserType | null;
	loginUser: (user: UserType, tokens: TokensType) => void;
	logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	loginUser: () => {},
	logoutUser: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const storedUser = localStorage.getItem("user");
	const [user, setUser] = useState<UserType | null>(
		storedUser ? JSON.parse(storedUser) : null,
	);

	const loginUser = (user: UserType, tokens: TokensType) => {
		setUser(user);
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("tokens", JSON.stringify(tokens));
	};

	const logoutUser = () => {
		setUser(null);
		localStorage.removeItem("cartItems");
		localStorage.removeItem("user");
		localStorage.removeItem("tokens");
	};

	useEffect(() => {
		const storedTokens = localStorage.getItem("tokens");

		if (storedTokens) {
			const tokens: TokensType = JSON.parse(storedTokens);
			const expiryDate = dayjs(tokens.expiry_date);
			const now = dayjs();

			if (now.isAfter(expiryDate)) {
				console.log("token is expired, logging out user");
				logoutUser();
			} else {
				console.log("token is not expired");
			}
		}
	});

	return (
		<AuthContext.Provider value={{ user, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
