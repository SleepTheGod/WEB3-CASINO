import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "app-client/src"),
			"@components": path.resolve(__dirname, "app-client/src/components"),
			"@pages": path.resolve(__dirname, "app-client/src/pages"),
		},
	},
	plugins: [
		preact(),
		// legacy({
		// 	targets: ["defaults", "not IE 11"], // Not needed for development (only use for live build)
		// }),
	],
	esbuild: {
		minify: true,
	},
	build: {
		minify: true, 
	},
	root: "./app-client", //Points to client folder
	base: "/",
});
