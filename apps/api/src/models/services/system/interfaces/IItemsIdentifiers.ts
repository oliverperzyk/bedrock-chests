/**
 * @summary Interface for the items identifiers.
 * @description This interface is used to define the items identifiers.
 */
interface IItemsIdentifiers {
    /**
     * @summary The items identifiers.
     * @description A record of item names and their corresponding identifiers.
     */
    readonly items: Record<string, number>
}

export type { IItemsIdentifiers }
