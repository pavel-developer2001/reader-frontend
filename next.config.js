/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "react-leaflet",
  "@react-leaflet/core",
])

module.exports = withTM({
  swcMinify: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["api.remanga.org", "res.cloudinary.com"],
  },
})
