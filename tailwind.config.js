/** @type {import('tailwindcss').Config} */
module.exports = {
  // This line tells Tailwind which files to scan for CSS classes.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  // This is where you add Tailwind plugins, like @tailwindcss/typography.
  plugins: [
    require('@tailwindcss/typography'),
    // Add any other Tailwind plugins here
  ],
};
