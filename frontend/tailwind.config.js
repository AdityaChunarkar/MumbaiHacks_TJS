/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#213555",
        secondary: "#e6e5ea",
        accent: "#4a4aff",
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
      },
      spacing: {
        sidebar: "15vw",
        mainContent: "280px",
      },
      fontSize: {
        xs: "0.8rem",
        sm: "0.85rem",
        base: "0.9rem",
        lg: "1rem",
        xl: "1.2rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
}
