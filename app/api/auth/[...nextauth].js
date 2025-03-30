import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // تنظیمات ارائه‌دهندگان (Providers)
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // تنظیمات دیتابیس (اختیاری)
  database: process.env.DATABASE_URL,

  // تنظیمات جلسه (Session) و توکن (Token)
  session: {
    jwt: true,
  },

  // تنظیمات اضافی
  callbacks: {
    async signIn(user, account, profile) {
      // منطق سفارشی برای ورود کاربر
      return true;
    },
    async redirect(url, baseUrl) {
      // منطق سفارشی برای تغییر مسیر
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});
