/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "omidelectronicazizkhani.ir"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "omidelectronicazizkhani.ir",
        pathname: "/**",
      },
    ],
  },
  // Disable static optimization for specific pages
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  // Disable static optimization for the users page
  staticPageGenerationTimeout: 120,
  // Disable static optimization for the users page
  output: "standalone",
};

module.exports = nextConfig;
