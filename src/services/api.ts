import axios, { AxiosInstance, AxiosPromise } from "axios";
import { User } from "../components/Header";
import { LoginRequest, LoginResponse } from "../schemas/auth";
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

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
      config.headers.Authorization = token ? `Bearer ${token}` : "";

      return config;
    });
  }

  login(payload: LoginRequest): AxiosPromise<LoginResponse> {
    return this.axiosInstance.post("/auth/login", payload);
  }

  fetchMenu(): AxiosPromise<Food[]> {
    return this.axiosInstance.get("/foods");
  }

  setHeaderToken(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("accessToken", token);
  }

  removeHeaderToken() {
    delete this.axiosInstance.defaults.headers.common.Authorization;
    localStorage.removeItem("accessToken");
  }

  getOrCreateUser() {}

  static async fetchGoogleUserData(token: string): Promise<User> {
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return data;
  }
}

export default APIService;
