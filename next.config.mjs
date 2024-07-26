/** @type {import('next').NextConfig} */

import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [
        ...config.plugins,
        new PrismaPlugin({
          paths: [
            "./prisma/historical1",
            "./prisma/historical2",
            "./prisma/historical3",
            "./prisma/historical4",
            "./prisma/sessions",
          ],
        }),
      ];
    }

    return config;
  },
};

export default nextConfig;
