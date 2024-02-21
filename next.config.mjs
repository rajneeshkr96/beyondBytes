/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['unsplash.com','source.unsplash.com',"firebasestorage.googleapis.com",'utfs.io'],
      },
    swcMinify: true,
};

export default nextConfig;
