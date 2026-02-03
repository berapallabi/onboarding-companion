import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            colors: {
                background: "rgb(15, 15, 25)",
                foreground: "rgb(250, 250, 250)",
                primary: "rgb(139, 92, 246)", // violet-500
                secondary: "rgb(96, 165, 250)", // blue-400
                accent: "rgb(236, 72, 153)", // pink-500
                muted: {
                    DEFAULT: "rgb(30, 30, 40)",
                    foreground: "rgb(156, 163, 175)", // gray-400
                },
                border: "rgba(255, 255, 255, 0.1)",
                card: {
                    DEFAULT: "rgba(30, 30, 40, 0.6)",
                    foreground: "rgb(250, 250, 250)",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
