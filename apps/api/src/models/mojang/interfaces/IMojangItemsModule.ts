import type { IMojangItem } from "./IMojangItem"

/**
 * @summary Vanilla item metadata module from Mojang bedrock-samples.
 * @description Root object of `mojang-items.json`, containing the list of item records to map.
 */
interface IMojangItemsModule {
    /**
     * @summary Item records in the module.
     * @description Array of Mojang item entries whose `name` and `raw_id` are dumped into identifiers files.
     */
    readonly data_items: readonly IMojangItem[]
}

export type { IMojangItemsModule }
