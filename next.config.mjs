/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['unsplash.com','images.unsplash.com',"firebasestorage.googleapis.com",'utfs.io','lh3.googleusercontent.com'],
      },
    swcMinify: true,
};

export default nextConfig;
