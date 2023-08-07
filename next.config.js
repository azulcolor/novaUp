/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: [
         '*',
         'localhost',
         'servicios.upqroo.edu.mx',
         'nova-up-api-development-773d.up.railway.app',
      ],
   },
};

module.exports = nextConfig;
