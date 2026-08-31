import { EnvironmentVariables } from "./EnvironmentVariables"

/**
 * @summary Social information about the website.
 * @description This includes colors, routes, etc. that might be useful to the website.
 */
class SocialData {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Background color of the website.
     * @description Used for the background of the website, by manifest information.
     */
    public static readonly BACKGROUND_COLOR: string = "#000000"

    /**
     * @summary Theme colors for both light & dark color schemas.
     * @description Used for the theme of the website, by manifest information.
     */
    public static readonly THEME_COLOR = {
        light: "#ffffff",
        dark: "#000000",
    }

    /**
     * @summary Link to a GitHub repository.
     * @remarks Must be a constant string as `next/link` wouldn't recognize it as a valid URL.
     */
    public static readonly GITHUB_REPOSITORY = "https://github.com/oliverperzyk/bedrock-chests" as const

    /**
     * @summary Merge a route with the website endpoint URL.
     * @param route The route to merge.
     * @returns The merged route.
     */
    public static mergeRoute(route: string): string {
        return new URL(route, EnvironmentVariables.WEBSITE_ENDPOINT_URL).toString()
    }
}

export { SocialData }
