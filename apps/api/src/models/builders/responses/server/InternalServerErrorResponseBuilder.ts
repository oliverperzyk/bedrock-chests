import { BaseResponseBuilder } from "../base/BaseResponseBuilder"
import type { IBaseResponseMessage } from "../base/IBaseResponseMessage"

/**
 * @summary Builder for the internal server error response.
 * @description Builds a response object for an internal server error.
 */
class InternalServerErrorResponseBuilder extends BaseResponseBuilder {
    /**
     * @summary Protected constructor.
     * @description Prevents instantiation of the class.
     */
    protected constructor() {
        super()
    }

    /**
     * @summary The HTTP status code of the response.
     * @description Always 500, matching HTTP Internal Server Error.
     */
    public override readonly HTTP_STATUS_CODE: number = 500

    /**
     * @summary Whether the response represents a successful operation.
     * @description Always false; this builder is used only for error responses.
     */
    public override readonly IS_SUCCESSFUL: boolean = false

    /**
     * @summary Builds a response object for an internal server error due to a failed item identifiers file read.
     * @description Returns a response object with the message "INTERNAL_SERVER_ERROR_ITEM_IDENTIFIERS_FILE_READ_FAILED" that is sent when the item identifiers file exists but cannot be parsed.
     * @returns The built response object.
     */
    public static get internalServerErrorItemIdentifiersFileReadFailed(): IBaseResponseMessage {
        return this.build("INTERNAL_SERVER_ERROR_ITEM_IDENTIFIERS_FILE_READ_FAILED", {
            message: "The item identifiers file could not be read.",
        })
    }
}

export { InternalServerErrorResponseBuilder }
