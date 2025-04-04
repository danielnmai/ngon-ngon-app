import axios, { AxiosInstance, AxiosPromise } from "axios";
import { LoginRequest, LoginResponse, TokensType } from "../schemas/auth";
import { Food } from "../schemas/menu";

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
}

export default APIService;
