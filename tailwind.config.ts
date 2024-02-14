import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "LightCoral": "#FFC1C1",
        "DarkCandyAppleRed": "#D20000",
        "Gray": "#8B8B8B"

      },
      width: {
        parentSectionWidth: "80rem",
        navbarLogoSectionWidth: "18rem",
        navbarItemsSectionWidth: "30rem",
        inputWidth: "21.875rem",
        cardWidth: "18.75rem",
        cardImageWidth: "13rem",
        cartItemsSectionWidth: "75rem",
        cartTableHeaderWidth: "42rem",
        cartImageWidth: "9.375rem",
        cartTitleWidth: "12.5rem",
        cartPriceWidth: "6.25rem",
        cartQuantityWidth: "9.375rem"

      },
      height: {
        cardHeight: "34.375rem",
        cardImageheight: "14.688rem",
        cartImageHeight: "6.25rem"
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        PlayfairDisplay: ['Playfair Display', 'serif'],
        Poppins: ['Poppins', 'serif']
      },
    },
  },
  plugins: [],
};
export default config;
