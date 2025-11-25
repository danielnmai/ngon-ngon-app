import { useGoogleLogin } from "@react-oauth/google";
import type { TokensType } from "../schemas/auth";
import type { UserType } from "../schemas/user";
import APIService from "../services/api";

const useHandleLogin = (
	loginUser: (user: UserType, tokens: TokensType) => void,
) => {
	const loginWithGoogle = useGoogleLogin({
		onSuccess: async ({ code }) => {
			const API = new APIService();

			try {
				const { data } = await API.login({ code });
				const { tokens, user } = data;

				loginUser(user, tokens);
			} catch (error) {
				console.error(error);
			}
		},
		onError: (error) => {
			console.error(error);
		},
		flow: "auth-code",
	});

	return { loginWithGoogle };
};

export { useHandleLogin };
