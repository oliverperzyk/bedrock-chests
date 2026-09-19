import { SocialData } from "@/oliverperzyk/libs/globals/SocialData"

/**
 * @summary Content of the feed.xml file.
 * @description Provides information to RSS readers about the website.
 */
const FEED_XML: string = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bedrock Chests</title>
    <link>${SocialData.mergeRoute("/")}</link>
    <description>A website about Bedrock Chests.</description>
    <language>en</language>
    <atom:link href="${SocialData.mergeRoute("/feed.xml")}" rel="self" type="application/rss+xml"/>
    <item>
      <title>Installation</title>
      <link>${SocialData.mergeRoute("/installation")}</link>
      <guid isPermaLink="true">${SocialData.mergeRoute("/installation")}</guid>
      <description>Installation instructions for Bedrock Chests.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>Documentation</category>
    </item>
  </channel>
</rss>`

/**
 * @summary Get the feed.xml file.
 * @description File provides information to RSS readers about the website.
 * @returns The feed.xml file with information about the website for RSS readers.
 */
export function GET(): Response {
    return new Response(FEED_XML, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    })
}
