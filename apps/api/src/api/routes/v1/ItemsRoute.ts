import { type Request, type Response, Router } from "express"
import { AcceptHeaderMiddleware } from "../../middlewares/headers/AcceptHeaderMiddleware"
import { ItemFilesSystemService } from "@/oliverperzyk/services/system/ItemFilesSystemService"
import { BadRequestResponseBuilder } from "@/oliverperzyk/models/builders/responses/errors/BadRequestResponseBuilder"
import type { IItemsIdentifiers } from "@/oliverperzyk/models/services/system/interfaces/IItemsIdentifiers"
import { InternalServerErrorResponseBuilder } from "@/oliverperzyk/models/builders/responses/server/InternalServerErrorResponseBuilder"
import { NotFoundResponseBuilder } from "@/oliverperzyk/models/builders/responses/errors/NotFoundResponseBuilder"

/**
 * @summary Router for the items route.
 * @description Router for the items route.
 */
const itemsRouter: Router = Router()

/**
 * @summary GET request handler for the items route.
 * @description Handles GET requests to the items route. Checks if the version identifier is valid, if the item identifiers file exists, and if it can be read.
 * @param request - The request object.
 * @param response - The response object.
 * @returns A promise that resolves to void.
 */
itemsRouter.get(
    "/:versionIdentifier",
    AcceptHeaderMiddleware.middleware,
    async (request: Request, response: Response): Promise<void> => {
        const versionIdentifier: unknown = request.params.versionIdentifier
        if (!ItemFilesSystemService.isValid(versionIdentifier)) {
            response.status(400).json(BadRequestResponseBuilder.badRequestInvalidVersionIdentifier)
            return
        }

        const itemFilesSystemService: ItemFilesSystemService = new ItemFilesSystemService(versionIdentifier)
        if (!itemFilesSystemService.exists()) {
            response.status(404).json(NotFoundResponseBuilder.notFoundItemIdentifiersFileNotFound)
            return
        }

        const itemIdentifiers: IItemsIdentifiers | null = await itemFilesSystemService.read()
        if (itemIdentifiers === null) {
            response
                .status(500)
                .json(InternalServerErrorResponseBuilder.internalServerErrorItemIdentifiersFileReadFailed)
            return
        }

        response.status(200).json(itemIdentifiers)
    },
)

export default itemsRouter
