import { BaseResponseBuilder } from "../base/BaseResponseBuilder"
import type { IBaseResponseMessage } from "../base/IBaseResponseMessage"

/**
 * @summary Builder for the not found response.
 * @description Builds a response object for a not found request.
 */
class NotFoundResponseBuilder extends BaseResponseBuilder {
    /**
     * @summary Protected constructor.
     * @description Prevents instantiation of the class.
     */
    protected constructor() {
        super()
    }

    /**
     * @summary The HTTP status code of the response.
     * @description Always 404, matching HTTP Not Found.
     */
    public override readonly HTTP_STATUS_CODE: number = 404

    /**
     * @summary Whether the response represents a successful operation.
     * @description Always false; this builder is used only for error responses.
     */
    public override readonly IS_SUCCESSFUL: boolean = false

    /**
     * @summary Builds a response object for a not found request due to a missing item identifiers file.
     * @description Returns a response object with the message "NOT_FOUND_ITEM_IDENTIFIERS_FILE_NOT_FOUND" that is sent when the versioned item identifiers file does not exist.
     * @returns The built response object.
     */
    public static get notFoundItemIdentifiersFileNotFound(): IBaseResponseMessage {
        return this.build("NOT_FOUND_ITEM_IDENTIFIERS_FILE_NOT_FOUND", {
            message: "The item identifiers file was not found.",
        })
    }
}

export { NotFoundResponseBuilder }
