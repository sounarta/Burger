/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*'
          },
           { port: 'http',
            hostname: '*',
          },
        ],
      },



}

module.exports = nextConfig
