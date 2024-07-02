/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "stars-pattern":
          "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22 fill=%22none%22><rect width=%22100%22 height=%22100%22 fill=%22%23007BFF%22/><g fill=%22%23FFFFFF%22><polygon points=%2250,5 61,39 95,39 67,59 77,93 50,72 23,93 33,59 5,39 39,39%22/></g></svg>')",
      }),
    },
  },
  plugins: [],
};
