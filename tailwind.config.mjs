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
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px", // Extra small devices
        sm: "480px", // Small devices
        md: "768px", // Medium devices
        lg: "1024px", // Large devices
        xl: "1280px", // Extra large devices
        "2xl": "1536px", // 2X Extra large devices
      },
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
        sans: ["tanha"],
        display: ["tanha"],
        body: ["tanha"],
      },
      fontSize: {
        xs: ["0.875rem", { lineHeight: "1.5" }], // 14px
        sm: ["1rem", { lineHeight: "1.75" }], // 16px
        base: ["1.125rem", { lineHeight: "1.75" }], // 18px
        lg: ["1.25rem", { lineHeight: "2" }], // 20px
        xl: ["1.5rem", { lineHeight: "2.25" }], // 24px
        "2xl": ["1.75rem", { lineHeight: "2.5" }], // 28px
        "3xl": ["2rem", { lineHeight: "2.75" }], // 32px
        "4xl": ["2.5rem", { lineHeight: "1" }], // 40px
        "5xl": ["3rem", { lineHeight: "1" }], // 48px
        "6xl": ["3.5rem", { lineHeight: "1" }], // 56px
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
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        10.5: "2.625rem",
        11.5: "2.875rem",
        12.5: "3.125rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        20: "5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
        900: "900ms",
        1000: "1000ms",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-expo": "cubic-bezier(1, 0, 0, 1)",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [
    rtl,
    function ({ addBase }) {
      addBase({
        // Body text elements
        input: {
          color: "rgb(38 38 38)", // This is the RGB value for text-neutral-800
        },
        textarea: {
          color: "rgb(38 38 38)", // This is the RGB value for text-neutral-800
        },
        "p, li, td, th, label, a, span, input, textarea, select, option": {
          fontSize: "1rem", // 16px
          lineHeight: "1.75",
        },
        button: {
          fontSize: "1rem", // 16px
          fontWeight: "800",
        },
        h1: {
          fontSize: "2rem", // 32px
          lineHeight: "1.2",
          fontWeight: "700",
        },
        h2: {
          fontSize: "1.75rem", // 28px
          lineHeight: "1.3",
          fontWeight: "700",
        },
        h3: {
          fontSize: "1.5rem", // 24px
          lineHeight: "1.4",
          fontWeight: "600",
        },
        h4: {
          fontSize: "1.25rem", // 20px
          lineHeight: "1.5",
          fontWeight: "600",
        },
        h5: {
          fontSize: "1.125rem", // 18px
          lineHeight: "1.6",
          fontWeight: "500",
        },
        h6: {
          fontSize: "1rem", // 16px
          lineHeight: "1.7",
          fontWeight: "500",
        },
        // Responsive font sizes
        "@screen sm": {
          "p, li, td, th, label, a, span, input, textarea, select, option": {
            fontSize: "1.125rem", // 18px
          },
          button: {
            fontSize: "1.125rem",
          },
          h1: { fontSize: "2.5rem" }, // 40px
          h2: { fontSize: "2rem" }, // 32px
          h3: { fontSize: "1.75rem" }, // 28px
          h4: { fontSize: "1.5rem" }, // 24px
          h5: { fontSize: "1.25rem" }, // 20px
        },
        "@screen md": {
          "p, li, td, th, label, a, span, input, textarea, select, option": {
            fontSize: "1.25rem", // 20px
          },
          button: {
            fontSize: "1.25rem",
          },
          h1: { fontSize: "3rem" }, // 48px
          h2: { fontSize: "2.5rem" }, // 40px
          h3: { fontSize: "2rem" }, // 32px
          h4: { fontSize: "1.75rem" }, // 28px
          h5: { fontSize: "1.5rem" }, // 24px
        },
        "@screen lg": {
          "p, li, td, th, label, a, span, input, textarea, select, option": {
            fontSize: "1.375rem", // 22px
          },
          button: {
            fontSize: "1.375rem",
          },
          h1: { fontSize: "3.5rem" }, // 56px
          h2: { fontSize: "3rem" }, // 48px
          h3: { fontSize: "2.5rem" }, // 40px
          h4: { fontSize: "2rem" }, // 32px
          h5: { fontSize: "1.75rem" }, // 28px
        },
        "@screen xl": {
          "p, li, td, th, label, a, span, input, textarea, select, option": {
            fontSize: "1.5rem", // 24px
          },
          button: {
            fontSize: "1.5rem",
          },
          h1: { fontSize: "4rem" }, // 64px
          h2: { fontSize: "3.5rem" }, // 56px
          h3: { fontSize: "3rem" }, // 48px
          h4: { fontSize: "2.5rem" }, // 40px
          h5: { fontSize: "2rem" }, // 32px
        },
      });
    },
    function ({ addComponents }) {
      addComponents({
        ".text-responsive": {
          fontSize: "1.5rem", // Base (mobile)
          lineHeight: "1.75",
          "@screen sm": {
            fontSize: "1.625rem", // sm (640px)
          },
          "@screen md": {
            fontSize: "1.75rem", // md (768px)
          },
          "@screen lg": {
            fontSize: "1.875rem", // lg (1024px)
          },
          "@screen xl": {
            fontSize: "2rem", // xl (1280px)
          },
          "@screen 2xl": {
            fontSize: "2.125rem", // 2xl (1536px)
          },
        },
        ".text-responsive-sm": {
          fontSize: "1.25rem", // Base (mobile)
          lineHeight: "1.75",
          "@screen sm": {
            fontSize: "1.375rem", // sm (640px)
          },
          "@screen md": {
            fontSize: "1.5rem", // md (768px)
          },
          "@screen lg": {
            fontSize: "1.625rem", // lg (1024px)
          },
          "@screen xl": {
            fontSize: "1.75rem", // xl (1280px)
          },
          "@screen 2xl": {
            fontSize: "1.875rem", // 2xl (1536px)
          },
        },
        ".text-responsive-xs": {
          fontSize: "1rem", // Base (mobile)
          lineHeight: "1.75",
          "@screen sm": {
            fontSize: "1.125rem", // sm (640px)
          },
          "@screen md": {
            fontSize: "1.25rem", // md (768px)
          },
          "@screen lg": {
            fontSize: "1.375rem", // lg (1024px)
          },
          "@screen xl": {
            fontSize: "1.5rem", // xl (1280px)
          },
          "@screen 2xl": {
            fontSize: "1.625rem", // 2xl (1536px)
          },
        },
      });
    },
  ],
  corePlugins: {
    preflight: true,
  },
};

export default config;
