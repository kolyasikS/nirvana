/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    // webpack(config) {
    //     config.resolve.fallback = {
    //         ...config.resolve.fallback,
    //         fs: false,
    //     }
    //
    //     return config;
    // },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/login",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
