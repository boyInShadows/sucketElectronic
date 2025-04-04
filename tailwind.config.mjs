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
        primary: {
          DEFAULT: "#1E3A8A", // آبی سیر
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#F3F4F6", // خاکستری روشن
          light: "#F9FAFB",
          dark: "#E5E7EB",
        },
        accent: {
          DEFAULT: "#F97316", // نارنجی روشن
          light: "#FB923C",
          dark: "#EA580C",
        },
        neutral: {
          DEFAULT: "#374151", // خاکستری تیره
          light: "#6B7280",
          dark: "#1F2937",
        },
        success: "#10B981", // سبز
        error: "#EF4444", // قرمز
      },
      fontFamily: {
        sans: [
          "IRANSans",
          "Vazirmatn",
          "Vazir",
          "Tahoma",
          "Arial",
          "sans-serif",
        ],
        display: [
          "IRANSans",
          "Vazirmatn",
          "Vazir",
          "Tahoma",
          "Arial",
          "sans-serif",
        ],
        body: [
          "IRANSans",
          "Vazirmatn",
          "Vazir",
          "Tahoma",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.025em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.025em" }],
        base: ["0.9375rem", { lineHeight: "1.5rem", letterSpacing: "0.025em" }],
        lg: ["1.0625rem", { lineHeight: "1.75rem", letterSpacing: "0.025em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "0.025em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "0.025em" }],
        "3xl": [
          "1.875rem",
          { lineHeight: "2.25rem", letterSpacing: "0.025em" },
        ],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "0.025em" }],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
        400: "400ms",
      },
    },
  },
  plugins: [rtl], // افزونه RTL
};

export default config;
