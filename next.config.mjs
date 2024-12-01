/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.cache = false; // 캐시를 완전히 비활성화
        return config;
    },
};

export default nextConfig;