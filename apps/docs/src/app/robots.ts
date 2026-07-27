import type { MetadataRoute } from "next"
import { SocialData } from "../libs/globals/SocialData"
import { EnvironmentVariables } from "../libs/globals/EnvironmentVariables"

/**
 * @summary Generate the robots.txt file.
 * @description File provides information to web crawlers about the website.
 * @returns The robots.txt file.
 */
function RobotsRoute(): MetadataRoute.Robots {
    return {
        rules: {
            allow: "/",
            userAgent: "*",
        },
        host: EnvironmentVariables.WEBSITE_ENDPOINT_URL.host,
        sitemap: SocialData.mergeRoute("/sitemap.xml"),
    }
}

export default RobotsRoute
