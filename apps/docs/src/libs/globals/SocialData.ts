import { EnvironmentVariables } from "./EnvironmentVariables"

/**
 * @summary Social information about the website.
 * @description This includes colors, routes, etc. that might be useful to the website.
 */
class SocialData {
    /**
     * @summary Private constructor.
     * @description Private constructor to prevent instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Background color of the website.
     */
    public static readonly BACKGROUND_COLOR: string = "#000000"

    /**
     * @summary Theme colors for both light & dark color schemas.
     */
    public static readonly THEME_COLOR = {
        light: "#ffffff",
        dark: "#000000",
    }

    public static readonly GITHUB_REPOSITORY = "https://github.com/oliverperzyk/chest-ui" as const

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
