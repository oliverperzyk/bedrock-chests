import { type Request, type Response, Router } from "express"
import { AcceptHeaderMiddleware } from "../../middlewares/headers/AcceptHeaderMiddleware"

/**
 * @summary Router for the health route.
 * @description Router for the health route.
 */
const healthRouter: Router = Router()

/**
 * @summary GET request handler for the health route.
 * @description Handles GET requests to the health route.
 * @param request - The request object.
 * @param response - The response object.
 * @returns A promise that resolves to void.
 */
healthRouter.get("/", AcceptHeaderMiddleware.middleware, async (_: Request, response: Response): Promise<void> => {
    response.status(200).json({ message: "OK" })
})

export default healthRouter
