/**
 * @summary Class that contains identifiers of vanilla items.
 * @description It's automatically updated via a CD workflow (sometimes manually).
 */
class HardCodedChestsItemsData {
    /**
     * @summary Private constructor.
     * @description Private constructor is to prevent instanization & inheritance.
     */
    private constructor() {}

    /**
     * @summary Hashmap with all vanilla items.
     * @description A hardcoded hashmap that contains all type identifiers and their corresponding identifiers.
     */
    public static readonly VANILLA_ITEMS: ReadonlyMap<string, number> = new Map<string, number>([])
}

export { HardCodedChestsItemsData }
