import express from "express"

/**
 * @summary Manager of the Express application instance.
 * @description Holds a single Express app and applies JSON and URL-encoded body parsers on first access.
 */
class ApplicationInstanceManager {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation & inheritance.
     */
    private constructor() {}

    /**
     * @summary Internal Express application instance.
     * @description Created lazily the first time {@link ApplicationInstanceManager.instance} is accessed.
     */
    private static internalInstance: express.Express | null = null

    /**
     * @summary Shared Express application instance.
     * @description Returns the existing app, or creates new one.
     * @returns The Express application instance.
     */
    public static get instance(): express.Express {
        if (this.internalInstance === null) {
            this.internalInstance = express()
            this.internalInstance.use(express.json(), express.urlencoded({ extended: true }))
        }

        return this.internalInstance
    }
}

export { ApplicationInstanceManager }
