import { EnvironmentVariableError } from "@/oliverperzyk/libs/models/builders/process-errors/environment/EnvironmentVariableError"
import { NodeEnvironment } from "@/oliverperzyk/libs/models/general/environment/enums/NodeEnvironment"

/**
 * @summary Parser of environment variables.
 * @description This class is responsible for parsing environment variables from the `.env` file into a readable format.
 */
class EnvironmentVariablesDataManager {
    /**
     * @summary Private constructor.
     * @description Private constructor to prevent instanization & inheritance.
     */
    private constructor() {}

    /**
     * @summary Gets a node environment from the environment variable.
     * @description Gets a node environment from the environment variable.
     * @returns A node environment.
     * @throws {EnvironmentVariableError} If the variable is invalid or missing.
     */
    public static getNodeEnvironment(): NodeEnvironment {
        const rawValue: string | undefined = process.env.NODE_ENV
        if (rawValue === undefined) throw EnvironmentVariableError.fromMissingVariable("NODE_ENV")
        switch (rawValue.toUpperCase().trim()) {
            case NodeEnvironment.PRODUCTION:
                return NodeEnvironment.PRODUCTION
            case NodeEnvironment.DEVELOPMENT:
                return NodeEnvironment.DEVELOPMENT
            case NodeEnvironment.TEST:
                return NodeEnvironment.TEST
            default:
                throw EnvironmentVariableError.fromInvalidNodeEnvironment()
        }
    }

    /**
     * @summary Gets a URL from the environment variable.
     * @description Gets a URL from the environment variable.
     * @param variableName - Name of the environment variable.
     * @param rawValue - Raw value of the environment variable.
     * @param required - Whether the variable is required.
     * @returns A URL if the variable is required, otherwise undefined.
     * @throws {EnvironmentVariableError} If the variable is invalid, or missing and required.
     */
    public static getURL<T extends boolean>(
        variableName: string,
        rawValue: string | undefined,
        required: T,
    ): T extends true ? URL : URL | undefined {
        try {
            if (rawValue === undefined) {
                if (required) throw EnvironmentVariableError.fromMissingVariable(variableName)
                return undefined as T extends true ? URL : URL | undefined
            }

            return new URL(rawValue)
        } catch {
            throw EnvironmentVariableError.fromInvalidURL(variableName, rawValue)
        }
    }

    /**
     * @summary Gets a port from the environment variable.
     * @description Gets a port from the environment variable.
     * @param variableName - Name of the environment variable.
     * @param rawValue - Raw value of the environment variable.
     * @param required - Whether the variable is required.
     * @returns A port if the variable is required, otherwise undefined.
     * @throws {EnvironmentVariableError} If the variable is invalid, or missing and required.
     */
    public static getPort<T extends boolean>(
        variableName: string,
        rawValue: string | undefined,
        required: T,
    ): T extends true ? number : number | undefined {
        if (rawValue === undefined) {
            if (required) throw EnvironmentVariableError.fromMissingVariable(variableName)
            return undefined as T extends true ? number : number | undefined
        }

        try {
            return parseInt(rawValue)
        } catch {
            throw EnvironmentVariableError.fromInvalidPort(variableName, rawValue)
        }
    }
}

export { EnvironmentVariablesDataManager }
