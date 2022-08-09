/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["wallpaperspeed.id", "lh3.googleusercontent.com"],
  },
};

//Invalid Src prop error, in next js you have to configure your
//image's hostname

module.exports = nextConfig;
