module.exports = {
  webpack(conf) {
    conf.resolve.fallback = { wagmi: false };
    return conf;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.stamp.fyi",
        port: "",
        pathname: "/avatar/**",
      },
    ],
  },
};
