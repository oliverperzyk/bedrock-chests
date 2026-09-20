import { BaseResponseBuilder } from "../base/BaseResponseBuilder"
import type { IBaseResponseMessage } from "../base/IBaseResponseMessage"

/**
 * @summary Builder for the bad request response.
 * @description Builds a response object for a bad request.
 */
class BadRequestResponseBuilder extends BaseResponseBuilder {
    /**
     * @summary Protected constructor.
     * @description Prevents instantiation of the class.
     */
    protected constructor() {
        super()
    }

    /**
     * @summary The HTTP status code of the response.
     * @description Always 400, matching HTTP Bad Request.
     */
    public override readonly HTTP_STATUS_CODE: number = 400

    /**
     * @summary Whether the response represents a successful operation.
     * @description Always false; this builder is used only for error responses.
     */
    public override readonly IS_SUCCESSFUL: boolean = false

    /**
     * @summary Builds a response object for a bad request due to an invalid version identifier.
     * @description Returns a response object with the message "BAD_REQUEST_INVALID_VERSION_IDENTIFIER" that is sent when the version identifier is not a valid `X.Y.Z` or `X.Y.Z.W` string.
     * @returns The built response object.
     */
    public static get badRequestInvalidVersionIdentifier(): IBaseResponseMessage {
        return this.build("BAD_REQUEST_INVALID_VERSION_IDENTIFIER", {
            message: "The version identifier is invalid.",
        })
    }
}

export { BadRequestResponseBuilder }
