// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your source files here
  ],
  theme: {
    extend: {
      perspective: {
        1000: "1000px",
      },
      rotate: {
        "y-180": "rotateY(180deg)",
      },
      transform: {
        "rotate-y-180": "rotateY(180deg)",
      },
    },
  },
  plugins: [
    function ({ addUtilities, e, theme, variants }) {
      const perspectives = theme("perspective");
      const perspectiveUtilities = Object.keys(perspectives).map((key) => {
        return {
          [`.${e(`perspective-${key}`)}`]: {
            perspective: perspectives[key],
          },
        };
      });
      addUtilities(perspectiveUtilities, variants("perspective"));
    },
  ],
};
