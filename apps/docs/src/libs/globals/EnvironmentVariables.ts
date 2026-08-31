import type { NodeEnvironment } from "../models/general/environment/enums/NodeEnvironment"
import { EnvironmentVariablesDataManager } from "./managers/security/EnvironmentVariablesDataManager"

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
    public static readonly NODE_ENV: NodeEnvironment = EnvironmentVariablesDataManager.getNodeEnvironment()

    /**
     * @summary Endpoint to the website. Used mostly for SEO things.
     * @description Endpoint to the website, that allows to configure e.g. robots, sitemap to point to actual endpoints, improving website's SEO.
     */
    public static readonly WEBSITE_ENDPOINT_URL: URL = EnvironmentVariablesDataManager.getURL(
        "NEXT_PUBLIC_WEBSITE_ENDPOINT_URL",
        process.env.NEXT_PUBLIC_WEBSITE_ENDPOINT_URL,
        true,
    )

    /**
     * @summary Endpoint to the API server.
     * @description Endpoint to the API server, that allows to download the library directly through the website.
     */
    public static readonly API_ENDPOINT_URL: URL = EnvironmentVariablesDataManager.getURL(
        "NEXT_PUBLIC_API_ENDPOINT_URL",
        process.env.NEXT_PUBLIC_API_ENDPOINT_URL,
        true,
    )

    /**
     * @summary Static block.
     * @description This static block adds additional checks on environment variables.
     */
    static {
        // We do not care about the value here, we just need to know that it's a valid value
        // or at least it's not provided.
        EnvironmentVariablesDataManager.getPort("APP_PORT", process.env.APP_PORT, false)
    }
}

export { EnvironmentVariables }
