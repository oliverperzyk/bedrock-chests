import { exit } from "process"

/**
 * @summary Class that represents a health check docker script.
 * @description This class is used to represent a health check docker script.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
class HealthCheckDockerScript {
    /**
     * @summary Private constructor.
     * @description Private constructor is to prevent instanization & inheritance.
     */
    private constructor() {}

    /**
     * @summary Static initializer.
     * @description Static initializer is to initialize the health check docker script.
     */
    static {
        void this.init()
    }

    /**
     * @summary Gets the port of the application.
     * @description This method is used to get the port of the application.
     * @returns The port of the application.
     */
    private static get APP_PORT(): number {
        try {
            const appPort: string | undefined = process.env.APP_PORT
            if (!appPort) return 3000
            const parsedAppPort: number = parseInt(appPort, 10)
            return isNaN(parsedAppPort) ? 3000 : parsedAppPort
        } catch {
            return 3000
        }
    }

    /**
     * @summary Initializes the health check docker script.
     * @description This method is used to initialize the health check docker script.
     */
    private static async init(): Promise<void> {
        try {
            const response: Response = await fetch(`http://localhost:${this.APP_PORT}/health`)
            exit(+!response.ok)
        } catch {
            exit(1)
        }
    }
}
