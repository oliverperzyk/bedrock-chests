import { HardCodedChestsItemsData } from "./data/HardCodedChestsItemsData"

/**
 * @summary Manager for all items that are used by forms.
 * @description Allows to get, fetch & calculate values that are used in chest forms later.
 */
class ChestsItemsManager {
    /**
     * @summary Private constructor.
     * @description Private constructor is to prevent instanization & inheritance.
     */
    private constructor() {}
    /**
     * @summary All items registered in a library.
     * @description This hashmap includes both - vanilla & custom items.
     */
    private static readonly ITEMS: Map<string, number> = new Map(HardCodedChestsItemsData.VANILLA_ITEMS.entries())

    /**
     * @summary Static initialization block.
     * @description Initializes a method to register custom items in a system.
     */
    static {
        void this.initializeCustomItems()
    }

    /**
     * @summary Initializes all custom items into a system.
     * @description This method allows to register custom items into a hashmap to display them without any additional configuration.
     */
    private static initializeCustomItems(): void {
        // to-do: implement the function
        return
    }

    /**
     * @summary Dynamically fetches items and saves them.
     * @description Connects with an external API server to fetch items, then they're parsed later.
     * @returns Method does not return anything, as items are automatically parsed to the hashmap.
     */
    public static async fetchDynamically(): Promise<void> {
        try {
            // to-do: download a library and make a simple GET request
        } catch {
            return
        }
    }

    /**
     * @summary Gets a raw identifier from item's type identifier.
     * @param typeId Type identifier of the item.
     * @returns Raw identifier from item's type identifier or null, if it does not exist.
     */
    public static getIdentifier(typeId: string): number | null {
        return this.ITEMS.get(typeId) ?? null
    }

    /**
     * @summary Resolves AUX identifier that is used directly in a form.
     * @param typeId Type identifier of the item.
     * @param enchanted Whenever item is enchanted (adds glowing effect).
     * @returns Resolved AUX identifier from provided arguments or null, if item with `typeId` argument does not exist.
     */
    public static getAuxId(typeId: string, enchanted: boolean = false): number | null {
        const rawId: number | undefined = this.ITEMS.get(typeId)
        if (rawId === undefined) return null
        return rawId * 65536 + Number(enchanted) * 32768
    }
}

export { ChestsItemsManager }
