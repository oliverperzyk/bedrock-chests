import type { MetadataRoute } from "next"
import { SocialData } from "../libs/globals/SocialData"

/**
 * @summary Generate the sitemap.xml file.
 * @description File provides information to web crawlers & search engines about the website.
 * @returns The sitemap.xml file.
 */
function SitemapRoute(): MetadataRoute.Sitemap {
    return [
        {
            url: SocialData.mergeRoute("/"),
            changeFrequency: "yearly",
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: SocialData.mergeRoute("/installation"),
            changeFrequency: "yearly",
            lastModified: new Date(),
            priority: 0.9,
        },
    ]
}

export default SitemapRoute
