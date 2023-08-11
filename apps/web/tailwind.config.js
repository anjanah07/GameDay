module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        proto: ["Proto", "sans-serif"],
      },

      gridTemplateColumns: {
        // Simple 16 column grid
        28: "repeat(28, minmax(0, 1fr))",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
      gridTemplateRows: {
        // Simple 16 column grid
        30: "repeat(30, minmax(0, 1fr))",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
      colors: {
        "main-dark": "#111111",
        "main-light": "#F9F9F9",
        text: "#F7D89E",
        "text-hover": "#EFF7BE",
        heading: "#FF8700",
        custom: {
          1: "#2465F7",
          2: "#0071BC",
        },
      },
    },
  },
  plugins: [],
};
