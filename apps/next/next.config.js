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
    ],
  },
};
