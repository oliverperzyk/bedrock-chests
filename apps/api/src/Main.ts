/**
 * @summary Entrypoint of the API.
 * @description Entrypoint of the API.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
class Main {
    /**
     * @summary Private constructor.
     * @description Prevents from initialization & inheritance.
     */
    private constructor() {}

    /**
     * @summary Static initializer.
     * @description Initializes the API.
     */
    static {
        void this.init()
    }

    /**
     * @summary Initializes the API.
     * @description Initializes the API & its dependencies.
     */
    private static async init(): Promise<void> { 
        console.log("Hello, world!")
    }
}