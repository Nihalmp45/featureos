/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}", // Add this for Next.js 13+ with /app router
    ],
    darkMode: 'media', // 'media' enables automatic dark mode based on system preference
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
        },
      },
    },
    plugins: [],
  };
  
  