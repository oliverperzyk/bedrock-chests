import { env } from "bun"

/**
 * @summary Custom error class for environment variable errors.
 * @description This error class is used to throw errors when environment variables are missing or invalid.
 */
class EnvironmentVariableError extends Error {
    /**
     * @summary The value of the environment variable that caused the error.
     * @description Unparsed value of the environment variable that caused the error to be thrown.
     */
    public readonly variableValue?: string

    /**
     * @summary Constructor for the EnvironmentVariableError class.
     * @description Initializes the error with the given message and variable name.
     * @param message - The message of the error.
     * @param variableName - The name of the environment variable that caused the error.
     */
    public constructor(
        public override readonly message: string,
        public readonly variableName: string,
    ) {
        super(message)
        this.name = "EnvironmentVariableError"
        this.variableName = variableName
        this.variableValue = env[variableName]
        Object.setPrototypeOf(this, EnvironmentVariableError.prototype)
    }

    /**
     * @summary Creates an error for a missing environment variable.
     * @description Thrown when a required environment variable is not set.
     * @param variableName - The name of the environment variable that is missing.
     * @returns A new EnvironmentVariableError instance.
     */
    public static fromMissingVariable(variableName: string): EnvironmentVariableError {
        return new EnvironmentVariableError(`The environment variable "${variableName}" is missing.`, variableName)
    }

    /**
     * @summary Creates an error for an invalid number value.
     * @description Thrown when the environment variable cannot be parsed as a number.
     * @param variableName - The name of the environment variable that is invalid.
     * @returns A new EnvironmentVariableError instance.
     */
    public static fromInvalidNumberValue(variableName: string): EnvironmentVariableError {
        return new EnvironmentVariableError(
            `The environment variable "${variableName}" is not a valid number.`,
            variableName,
        )
    }

    /**
     * @summary Creates an error for an invalid port value.
     * @description Thrown when the environment variable is not an integer in the valid TCP/UDP port range.
     * @param variableName - The name of the environment variable that is invalid.
     * @returns A new EnvironmentVariableError instance.
     */
    public static fromInvalidPortValue(variableName: string): EnvironmentVariableError {
        return new EnvironmentVariableError(
            `The environment variable "${variableName}" is not a valid port.`,
            variableName,
        )
    }

    /**
     * @summary Creates an error for an invalid boolean value.
     * @description Thrown when the environment variable is not a case-insensitive "true" or "false".
     * @param variableName - The name of the environment variable that is invalid.
     * @returns A new EnvironmentVariableError instance.
     */
    public static fromInvalidBooleanValue(variableName: string): EnvironmentVariableError {
        return new EnvironmentVariableError(
            `The environment variable "${variableName}" is not a valid boolean.`,
            variableName,
        )
    }

    /**
     * @summary Creates an error for an invalid node environment value.
     * @description Thrown when NODE_ENV is not development, production, or test.
     * @returns Instance of an error related to the node environment.
     */
    public static fromInvalidNodeEnvironmentValue(): EnvironmentVariableError {
        return new EnvironmentVariableError(
            `The environment variable "NODE_ENV" is not a valid node environment.`,
            "NODE_ENV",
        )
    }
}

export { EnvironmentVariableError }
