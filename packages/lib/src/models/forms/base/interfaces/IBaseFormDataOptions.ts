/**
 * @summary Interface that contains options for a base form.
 * @description This interface is used to determine the options of a base form.
 */
interface IBaseFormDataOptions {
    /**
     * @summary Determines if the inventory should be displayed.
     * @description If it's set to true, the inventory will be displayed.
     * @default true
     */
    readonly displayInventory?: boolean
    /**
     * @summary Determines if the form should react to inventory clicks.
     * @description If it's set to true, the form will react to inventory clicks. It's only relevant if the inventory is displayed.
     * @default true
     */
    readonly reactToInventoryClicks?: boolean
}

export type { IBaseFormDataOptions }
