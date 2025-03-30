/** @type {import('tailwindcss').Config} */
const rtl = require("tailwindcss-rtl");

/*
=========1===========

آبی سیر (Navy Blue):
 #1E3A8A
 rgb(30, 58, 138)

خاکستری روشن (Light Gray):
 #F3F4F6
 rgb(243, 244, 246)

قرمز روشن (Bright Red):
 #DC2626
 rgb(220, 38, 38)
 
=========2===========

سیاه مات (Matte Black):
 #1A1A1A
 rgb(26, 26, 26)

نارنجی روشن (Bright Orange):
 #F97316
 rgb(249, 115, 22)

سفید (White):
 #FFFFFF
 rgb(255, 255, 255)

=========3===========

سبز تیره (Dark Green):
 #14532D
 rgb(20, 83, 45)

خاکستری تیره (Dark Gray):
 #374151
 rgb(55, 65, 81)

سفید (White):
 #FFFFFF
 rgb(255, 255, 255)

*/
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A", // سیاه مات
        secondary: "#F3F4F6", // خاکستری روشن
        accent: "#F97316", // نارنجی روشن
        "navy-blue": "#1E3A8A", // آبی سیر
        "bright-red": "#DC2626", // قرمز روشن
        "dark-green": "#14532D", // سبز تیره
        "dark-gray": "#374151", // خاکستری تیره
      },
      fontFamily: {
        sans: ["Vazir", "sans-serif"], // فونت فارسی Vazir
      },
    },
  },
  plugins: [rtl], // افزونه RTL
};

export default config;
