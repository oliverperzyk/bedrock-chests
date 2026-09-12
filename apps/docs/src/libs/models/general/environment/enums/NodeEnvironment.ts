/**
 * @summary Enumeration of node environments.
 * @description This enumeration is used to identify the environment that the application runs in.
 */
const enum NodeEnvironment {
    /**
     * @summary Production environment.
     * @description This environment is used for production deployments.
     */
    PRODUCTION = "PRODUCTION",
    /**
     * @summary Development environment.
     * @description This environment is used for development purposes.
     */
    DEVELOPMENT = "DEVELOPMENT",
    /**
     * @summary Test environment.
     * @description This environment is used for testing the application in e.g. CI workflow.
     */
    TEST = "TEST",
}

export { NodeEnvironment }
