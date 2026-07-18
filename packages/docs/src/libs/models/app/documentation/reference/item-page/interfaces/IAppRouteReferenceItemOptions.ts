/**
 * @summary Options of a reference page.
 * @description This interface contains what information is passed to the page.
 */
interface IAppRouteReferenceItemOptions {
    /**
     * @summary Params passed in URL.
     * @description All params passed via URL, that are under a promise.
     */
    readonly params: Promise<
        Readonly<{
            /**
             * @summary Name of an item.
             * @description Name of requested item to be documented.
             */
            readonly itemName: string
        }>
    >
}

export type { IAppRouteReferenceItemOptions }
