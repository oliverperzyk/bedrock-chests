/**
 * @summary Error related to environment variables.
 * @description This class is thrown when any of environment variables is invalid.
 */
class EnvironmentVariableError extends Error {
    /**
     * @summary Name of the environment variable.
     * @description Name of the environment variable, that caused the error.
     */
    public readonly variableName: string
    /**
     * @summary Value of the environment variable.
     * @description Value of the environment variable, that caused the error.
     */
    public readonly variableValue: string | undefined

    /**
     * @summary Constructor of the error.
     * @description Creates a new instance of the error.
     * @param message - Message of the error.
     * @param variableName - Name of the environment variable.
     * @param variableValue - Value of the environment variable.
     */
    public constructor(message: string, variableName: string, variableValue: string | undefined) {
        super(message)
        this.name = "EnvironmentVariableError"
        this.variableName = variableName
        this.variableValue = variableValue
        Object.setPrototypeOf(this, EnvironmentVariableError.prototype)
    }

    /**
     * @summary Creates a new instance of the error for missing variable.
     * @description Creates a new instance of the error for missing variable.
     * @param variableName - Name of the environment variable.
     * @returns A new instance of the error.
     */
    public static fromMissingVariable(variableName: string): EnvironmentVariableError {
        return new this(`Environment variable ${variableName} is missing.`, variableName, undefined)
    }

    /**
     * @summary Creates a new instance of the error for invalid node environment.
     * @description Creates a new instance of the error for invalid node environment.
     * @returns A new instance of the error.
     */
    public static fromInvalidNodeEnvironment(): EnvironmentVariableError {
        return new this(
            `Environment variable NODE_ENV is invalid. Allowed values are: "PRODUCTION", "DEVELOPMENT", "TEST".`,
            "NODE_ENV",
            process.env.NODE_ENV,
        )
    }

    /**
     * @summary Creates a new instance of the error for invalid URL.
     * @description Creates a new instance of the error for invalid URL.
     * @param variableName - Name of the environment variable.
     * @returns A new instance of the error.
     */
    public static fromInvalidURL(variableName: string, variableValue: string | undefined): EnvironmentVariableError {
        return new this(
            `Environment variable ${variableName} is invalid. It must be a valid URL.`,
            variableName,
            variableValue,
        )
    }

    /**
     * @summary Creates a new instance of the error for invalid port.
     * @description Creates a new instance of the error for invalid port.
     * @param varialeName - Name of the environment variable.
     * @param variableValue - Value of the environment variable.
     * @returns A new instance of the error.
     */
    public static fromInvalidPort(varialeName: string, variableValue: string | undefined): EnvironmentVariableError {
        return new this(
            `Environment variable ${varialeName} is invalid. It must be a valid number.`,
            varialeName,
            variableValue,
        )
    }
}

export { EnvironmentVariableError }
