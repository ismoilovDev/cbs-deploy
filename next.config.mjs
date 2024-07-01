/** @type {import('next').NextConfig} */
const nextConfig = {
   compiler: {
      removeConsole: process.env.NODE_ENV !== "development",
   },
   images: {
      remotePatterns: [
         {
            protocol: "http",
            hostname: "127.0.0.1",
            port: "8080",
            pathname: "/**",
         },
      ]
   },
};

export default nextConfig;
