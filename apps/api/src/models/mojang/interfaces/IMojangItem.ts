/**
 * @summary A single vanilla item entry from Mojang bedrock-samples.
 * @description Shape of one object in the `data_items` array of `mojang-items.json`.
 */
interface IMojangItem {
    /**
     * @summary Command name of the item.
     * @description Identifier used in commands, when Mojang provides one.
     */
    readonly command_name?: string
    /**
     * @summary Canonical item identifier.
     * @description Namespaced name used as the mapping key, for example `minecraft:dirt`.
     */
    readonly name: string
    /**
     * @summary Numeric runtime identifier of the item.
     * @description Integer `raw_id` from Mojang, including negative values for blocks-as-items.
     */
    readonly raw_id: number
    /**
     * @summary Serialization identifier of the item.
     * @description Legacy `item.*` string used when serializing the item, when present.
     */
    readonly serialization_id?: string
    /**
     * @summary Serialization name of the item.
     * @description Namespaced name used when serializing the item, when present.
     */
    readonly serialization_name?: string
}

export type { IMojangItem }
