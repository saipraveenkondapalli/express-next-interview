/** @type {import('next').NextConfig} */
const { headers } = require("next/headers");

const ApiKey = "sampleKey";
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path",
        destination: "/api/auth/:path*",
      },
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Origin", value: "$1" },
          { key: "Express-Auth-Key", value: ApiKey },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
