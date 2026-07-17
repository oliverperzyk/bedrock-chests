/**
 * @summary Class to read environment variables.
 * @description This class stores all environment variables in read-only properties.
 */
class EnvironmentVariables {
    /**
     * @summary Private constructor.
     * @description Private constructor to prevent instanization & inheritance.
     */
    private constructor() {}

    /**
     * @summary Environment that application runs in.
     * @description Application's environment is in demand to enable or disable some of the things on the website.
     */
    public static readonly NODE_ENV: string = "TEST"

    /**
     * @summary Endpoint to the website. Used mostly for SEO things.
     * @description Endpoint to the website, that allows to configure e.g. robots, sitemap to point to actual endpoints, improving website's SEO.
     */
    public static readonly WEBSITE_ENDPOINT_URL: URL = new URL("https://oliverperzyk.com")
}

export { EnvironmentVariables }
