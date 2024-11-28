import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: 'class', // Enable dark mode based on a CSS class
	content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
				background: 'hsl(240 10% 3.9%)',
				'light-background': '#27272a',
				'main-dark': 'hsl(240 10% 3.9%)',
				'main-gray': '#27272a',
  			foreground: 'var(--foreground)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
			keyframes: {
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
				"spin": {
					'0%': {transform: 'rotate(0deg)'},
					'100%': {transform: 'rotate(360deg)'},
				}
			},
			animation: {
				"caret-blink": "caret-blink 1.25s ease-out infinite",
				"spin": 'spin 1s linear infinite',
			},
  	}
  },
	// eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
