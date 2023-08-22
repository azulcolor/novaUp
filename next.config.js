/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: [
         '*',
         'localhost',
         'servicios.upqroo.edu.mx',
         'nova-up-api-development-773d.up.railway.app',
         'www.youtube.com',
         'img.youtube.com',
      ],
   },
};

module.exports = nextConfig;
