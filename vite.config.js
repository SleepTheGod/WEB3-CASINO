import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";
import { ViteMinifyPlugin } from "vite-plugin-minify";
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
	root: "./app-client", // Update the root property to point to your client folder
	base: "/",
});
