import type { Metadata, Viewport } from "next"
import type { IChildren } from "../libs/models/components/general/interfaces/IChildren"
import type { JSX } from "react"
import { ThemeProvider } from "@wrksz/themes/next"
import { SocialData } from "../libs/globals/SocialData"
import "@/oliverperzyk/styles/GlobalStyles.css"
import { EnvironmentVariables } from "../libs/globals/EnvironmentVariables"

/**
 * @summary Metadata information.
 * @description Default metadata information for the whole application.
 */
const metadata: Metadata = {
    metadataBase: EnvironmentVariables.WEBSITE_ENDPOINT_URL,
    title: "@oliverperzyk/chest-ui",
    description: "The easiest way to create GUI components that emulate chests in Minecraft: Bedrock Edition.",
    applicationName: "@oliverperzyk/chest-ui",
    creator: "oliverperzyk (Oliwier Perzyński)",
    authors: [
        {
            name: "oliverperzyk (Oliwier Perzyński)",
            url: "https://oliverperzyk.com",
        },
    ],
    openGraph: {
        type: "website",
        title: "@oliverperzyk/chest-ui",
        description: "The easiest way to create GUI components that emulate chests in Minecraft: Bedrock Edition.",
    },
}

/**
 * @summary Viewport information.
 * @description Default viewport information for the whole application.
 */
const viewport: Viewport = {
    width: "device-width",
    colorScheme: "light dark",
    initialScale: 1,
    themeColor: [
        {
            media: "(prefers-color-scheme: dark)",
            color: SocialData.THEME_COLOR.dark,
        },
        {
            media: "(prefers-color-scheme: light)",
            color: SocialData.THEME_COLOR.light,
        },
    ],
}

/**
 * @summary Global layout of the website.
 * @description This layout defines default structure of the website.
 * @param children - Destructred property that contains content of routes.
 * @returns Default structure of the website.
 */
function RootLayout({ children }: Readonly<IChildren>): JSX.Element {
    return (
        <html lang="en-US" className="h-full antialiased" suppressHydrationWarning>
            <body className="min-h-full flex flex-col">
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    )
}

export { metadata, viewport }
export default RootLayout
