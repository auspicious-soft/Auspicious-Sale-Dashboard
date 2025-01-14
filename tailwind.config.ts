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
      fontFamily: {
        RalewayRegular: ['var(--font-Raleway-Regular)'],
        RalewayLight: ['var(--font-Raleway-Light)'],
        RalewayExtraLight: ['var(--font-Raleway-ExtraLight)'],
        RalewayMedium: ['var(--font-Raleway-Medium)'], 
        RalewaySemiBold: ['var(--font-Raleway-SemiBold)'],
        RalewayBold: ['var(--font-Raleway-Bold)'], 
      },
      container: {
        center: true,
        
        padding: {
          DEFAULT: '18px',
          sm: '18px',
          md: '25px',
          lg: '30px',
          xl: '40px',
        },
      },
    },
  },
  plugins: [],
};
export default config;
