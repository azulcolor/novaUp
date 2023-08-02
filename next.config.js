/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: [
         '*',
         'i.imgur.com',
         'fakeimg.pl',
         'nova-up-api-development-773d.up.railway.app',
      ],
   },
};

module.exports = nextConfig;
