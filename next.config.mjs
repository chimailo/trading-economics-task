/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        baseUrl: process.env.TE_TASK_API_BASE_URL,
        apiKey: process.env.TE_TASK_API_KEY
    }
};

export default nextConfig;
