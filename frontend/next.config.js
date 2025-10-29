// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['images.unsplash.com', 'play-lh.googleusercontent.com'],
//   },
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'play-lh.googleusercontent.com'],
  },
  // Add trailing slash for consistency
  trailingSlash: false,
  // Output standalone for better deployment
  output: 'standalone',
}

module.exports = nextConfig