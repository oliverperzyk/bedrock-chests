import type { NextConfig } from "next"

/**
 * @summary Configuration of Next.js.
 * @description This file is used to configure the Next.js project.
 * @see {@link https://nextjs.org/docs/app/api-reference/config/next-config-js}
 */
export default {
    typedRoutes: true,
    reactCompiler: true,
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/repository",
                destination: "https://github.com/oliverperzyk/chest-ui",
                permanent: true,
                priority: true,
            },
            {
                source: "/issues",
                destination: "https://github.com/oliverperzyk/chest-ui/issues",
                permanent: true,
                priority: true,
            },
            {
                source: "/github",
                destination: "https://github.com/oliverperzyk/chest-ui",
                permanent: true,
                priority: true,
            },
        ]
    },
} satisfies NextConfig
