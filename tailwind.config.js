/** @type {import('tailwindcss').Config} */
export default {
	content: ["./app-client/index.html", "./app-client/src/**/*.{js,jsx}"],
	theme: {
		extend: {
			transitionProperty: {
				width: "width",
                left: "left",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar'),],
};
