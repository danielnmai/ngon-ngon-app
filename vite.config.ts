import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	css: {
		modules: {
			localsConvention: "camelCase",
			generateScopedName: "[local]_[hash:base64:2]",
		},
	},
});
