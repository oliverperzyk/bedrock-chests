import { HardCodedChestsItemsData } from "./HardCodedChestsItemsData"

/**
 * @summary Class that contains identifiers of variants of vanilla items.
 * @description This class is depending on offsets from {@link HardCodedChestsItemsData}.
 * @remarks This class is not updated automatically, as Mojang does not provide data for additional variants of items.
 */
class DataChestsItemsData {
    /**
     * @summary Private constructor.
     * @description Private constructor is to prevent instanization & inheritance.
     */
    private constructor() {}

    /**
     * @summary Offsets for colors.
     * @description This is used to reduce amount of hardcoded values for variants with colors. This is used by e.g. banners.
     */
    private static readonly COLORS_OFFSETS: Readonly<Record<string, number>> = {
        BLACK: 0,
        RED: 1 / 65536,
        GREEN: 2 / 65536,
        BROWN: 3 / 65536,
        BLUE: 4 / 65536,
        PURPLE: 5 / 65536,
        CYAN: 6 / 65536,
        LIGHT_GRAY: 7 / 65536,
        GRAY: 8 / 65536,
        PINK: 9 / 65536,
        LIME: 10 / 65536,
        YELLOW: 11 / 65536,
        LIGHT_BLUE: 12 / 65536,
        MAGENTA: 13 / 65536,
        ORANGE: 14 / 65536,
        WHITE: 15 / 65536,
    }

    /**
     * @summary Generates a hashmap with additional variants of items.
     * @description Method generates a hashmap with missing variants (e.g. colors) of existing items in {@link HardCodedChestsItemsData}. It depends directly on the hashmap from `HardCodedChestsItemsData.VANILLA_ITEMS`.
     */
    private static generateVanillaItemsVariantsHashmap(): ReadonlyMap<string, number> {
        const additionalItems: Map<string, number> = new Map<string, number>()
        const snowLayerIdentifier: number | undefined =
            HardCodedChestsItemsData.VANILLA_ITEMS.get("minecraft:snow_layer")
        if (snowLayerIdentifier) {
            for (let i: number = 1; i <= 8; i++) {
                additionalItems.set(`minecraft:snow_layer_${i + 1}`, snowLayerIdentifier + i / 65536)
            }
        }

        return additionalItems
    }

    /**
     * @summary Hashmap with all additional vanilla items' variants.
     * @description This hashmap depends on {@link HardCodedChestsItemsData}.
     */
    public static readonly VANILLA_ITEMS: ReadonlyMap<string, number> =
        DataChestsItemsData.generateVanillaItemsVariantsHashmap()
}

export { DataChestsItemsData }
