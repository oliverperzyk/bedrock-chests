import { HardCodedChestsItemsData } from "./HardCodedChestsItemsData"

/**
 * @summary Class that contains identifiers of variants of vanilla items.
 * @description This class is depending on offsets from {@link HardCodedChestsItemsData}.
 * @remarks This class is not updated automatically, as Mojang does not provide data for additional variants of items.
 * They're resolved by calculating offsets from the base item.
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
     * @summary Offsets for white-first color variants.
     * @description Used by beds and balloons, where white is data value 0 and black is 15.
     */
    private static readonly WHITE_FIRST_COLORS_OFFSETS: Readonly<Record<string, number>> = {
        WHITE: 0,
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
        BLACK: 15 / 65536,
    }

    /**
     * @summary Offsets for structure block modes.
     * @description Maps structure block mode type identifiers to fractional offsets from `minecraft:structure_block`.
     */
    private static readonly STRUCTURE_BLOCK_OFFSETS: Readonly<Record<string, number>> = {
        "minecraft:structure_block_data": 0,
        "minecraft:structure_block_save": 1 / 65536,
        "minecraft:structure_block_load": 2 / 65536,
        "minecraft:structure_block_corner": 3 / 65536,
        "minecraft:structure_block_invalid": 4 / 65536,
        "minecraft:structure_block_export": 5 / 65536,
    }

    /**
     * @summary Offsets for tipped arrow variants.
     * @description Maps tipped arrow type identifiers to fractional offsets from `minecraft:arrow`.
     */
    private static readonly ARROW_OFFSETS: Readonly<Record<string, number>> = {
        "minecraft:splash_arrow": 1 / 65536,
        "minecraft:mundane_arrow": 2 / 65536,
        "minecraft:thick_arrow": 4 / 65536,
        "minecraft:awkward_arrow": 5 / 65536,
        "minecraft:night_vision_arrow": 6 / 65536,
        "minecraft:leaping_arrow": 9 / 65536,
        "minecraft:fire_resistance_arrow": 13 / 65536,
        "minecraft:swiftness_arrow": 15 / 65536,
        "minecraft:slowness_arrow": 18 / 65536,
        "minecraft:water_breathing_arrow": 20 / 65536,
        "minecraft:healing_arrow": 22 / 65536,
        "minecraft:harming_arrow": 24 / 65536,
        "minecraft:poison_arrow": 26 / 65536,
        "minecraft:regeneration_arrow": 29 / 65536,
        "minecraft:strength_arrow": 32 / 65536,
        "minecraft:weakness_arrow": 35 / 65536,
        "minecraft:decay_arrow": 37 / 65536,
        "minecraft:turtle_master_arrow": 38 / 65536,
        "minecraft:slow_falling_arrow": 41 / 65536,
    }

    /**
     * @summary Offsets for potion effects.
     * @description Shared effect offsets used to generate potion, splash potion & lingering potion variants.
     */
    private static readonly POTION_EFFECT_OFFSETS: Readonly<Record<string, number>> = {
        mundane: 1 / 65536,
        thick: 3 / 65536,
        awkward: 4 / 65536,
        night_vision: 5 / 65536,
        leaping: 8 / 65536,
        fire_resistance: 12 / 65536,
        swiftness: 14 / 65536,
        slowness: 17 / 65536,
        water_breathing: 19 / 65536,
        healing: 21 / 65536,
        harming: 23 / 65536,
        poison: 25 / 65536,
        regeneration: 28 / 65536,
        strength: 31 / 65536,
        weakness: 34 / 65536,
        decay: 36 / 65536,
        turtle_master: 37 / 65536,
        slow_falling: 40 / 65536,
    }

    /**
     * @summary Offsets for filled map variants.
     * @description Maps explorer & village map type identifiers to fractional offsets from `minecraft:filled_map`.
     */
    private static readonly MAP_OFFSETS: Readonly<Record<string, number>> = {
        "minecraft:locator_map": 2 / 65536,
        "minecraft:ocean_explorer_map": 3 / 65536,
        "minecraft:woodland_explorer_map": 4 / 65536,
        "minecraft:treasure_map": 5 / 65536,
        "minecraft:locked_map": 6 / 65536,
        "minecraft:snowy_village_map": 7 / 65536,
        "minecraft:taiga_village_map": 8 / 65536,
        "minecraft:plains_village_map": 9 / 65536,
        "minecraft:savanna_village_map": 10 / 65536,
        "minecraft:desert_village_map": 11 / 65536,
        "minecraft:jungle_village_map": 12 / 65536,
        "minecraft:swamp_village_map": 13 / 65536,
    }

    /**
     * @summary Offsets for chemistry compound variants.
     * @description Maps compound type identifiers to fractional offsets from `minecraft:compound`.
     */
    private static readonly COMPOUND_OFFSETS: Readonly<Record<string, number>> = {
        "minecraft:compound_salt": 0,
        "minecraft:compound_sodium_oxide": 1 / 65536,
        "minecraft:compound_sodium_hydroxide": 2 / 65536,
        "minecraft:compound_magnesium_nitrate": 3 / 65536,
        "minecraft:compound_iron_sulfide": 4 / 65536,
        "minecraft:compound_lithium_hydride": 5 / 65536,
        "minecraft:compound_sodium_hydride": 6 / 65536,
        "minecraft:compound_calcium_bromide": 7 / 65536,
        "minecraft:compound_magnesium_oxide": 8 / 65536,
        "minecraft:compound_sodium_acetate": 9 / 65536,
        "minecraft:compound_luminol": 10 / 65536,
        "minecraft:compound_charcoal": 11 / 65536,
        "minecraft:compound_sugar": 12 / 65536,
        "minecraft:compound_aluminum_oxide": 13 / 65536,
        "minecraft:compound_boron_trioxide": 14 / 65536,
        "minecraft:compound_soap": 15 / 65536,
        "minecraft:compound_polyethylene": 16 / 65536,
        "minecraft:compound_garbage": 17 / 65536,
        "minecraft:compound_blue_jar": 24 / 65536,
        "minecraft:compound_blue_beaker": 26 / 65536,
        "minecraft:compound_glue": 27 / 65536,
        "minecraft:compound_white_beaker": 28 / 65536,
        "minecraft:compound_black_beaker": 29 / 65536,
        "minecraft:compound_yellow_beaker": 31 / 65536,
        "minecraft:compound_clear_beaker": 35 / 65536,
        "minecraft:compound_blue_bottle": 38 / 65536,
    }

    /**
     * @summary Offsets for medicine variants.
     * @description Maps medicine type identifiers to fractional offsets from `minecraft:medicine`.
     */
    private static readonly MEDICINE_OFFSETS: Readonly<Record<string, number>> = {
        "minecraft:eye_drops": 0,
        "minecraft:tonic": 1 / 65536,
        "minecraft:antidote": 2 / 65536,
        "minecraft:elixir": 3 / 65536,
    }

    /**
     * @summary Offsets for sparkler variants.
     * @description Maps sparkler type identifiers (including lit ones) to fractional offsets from `minecraft:sparkler`.
     */
    private static readonly SPARKLER_OFFSETS: Readonly<Record<string, number>> = {
        "minecraft:blue_sparkler": 0,
        "minecraft:red_sparkler": 1 / 65536,
        "minecraft:green_sparkler": 2 / 65536,
        "minecraft:pink_sparker": 5 / 65536,
        "minecraft:orange_sparkler": 14 / 65536,
        "minecraft:lit_blue_sparkler": 32 / 65536,
        "minecraft:lit_red_sparkler": 33 / 65536,
        "minecraft:lit_green_sparkler": 34 / 65536,
        "minecraft:lit_pink_sparker": 37 / 65536,
        "minecraft:lit_orange_sparkler": 46 / 65536,
    }

    /**
     * @summary Offsets for glow stick variants.
     * @description Maps glow stick type identifiers (including lit ones) to fractional offsets from `minecraft:glow_stick`.
     */
    private static readonly GLOWSTICK_OFFSETS: Readonly<Record<string, number>> = {
        "minecraft:red_glowstick": 1 / 65536,
        "minecraft:green_glowstick": 2 / 65536,
        "minecraft:brown_glowstick": 3 / 65536,
        "minecraft:blue_glowstick": 4 / 65536,
        "minecraft:purple_glowstick": 5 / 65536,
        "minecraft:cyan_glowstick": 6 / 65536,
        "minecraft:light_gray_glowstick": 7 / 65536,
        "minecraft:gray_glowstick": 8 / 65536,
        "minecraft:pink_glowstick": 9 / 65536,
        "minecraft:lime_glowstick": 10 / 65536,
        "minecraft:yellow_glowstick": 11 / 65536,
        "minecraft:light_blue_glowstick": 12 / 65536,
        "minecraft:magenta_glowstick": 13 / 65536,
        "minecraft:orange_glowstick": 14 / 65536,
        "minecraft:white_glowstick": 15 / 65536,
        "minecraft:lit_red_glowstick": 33 / 65536,
        "minecraft:lit_green_glowstick": 34 / 65536,
        "minecraft:lit_brown_glowstick": 35 / 65536,
        "minecraft:lit_blue_glowstick": 36 / 65536,
        "minecraft:lit_purple_glowstick": 37 / 65536,
        "minecraft:lit_cyan_glowstick": 38 / 65536,
        "minecraft:lit_light_gray_glowstick": 39 / 65536,
        "minecraft:lit_gray_glowstick": 40 / 65536,
        "minecraft:lit_pink_glowstick": 41 / 65536,
        "minecraft:lit_lime_glowstick": 42 / 65536,
        "minecraft:lit_yellow_glowstick": 43 / 65536,
        "minecraft:lit_light_blue_glowstick": 44 / 65536,
        "minecraft:lit_magenta_glowstick": 45 / 65536,
        "minecraft:lit_orange_glowstick": 46 / 65536,
        "minecraft:lit_white_glowstick": 47 / 65536,
    }

    /**
     * @summary Registers variants derived from a base item.
     * @description Looks up a base identifier in {@link HardCodedChestsItemsData} and writes each variant as `base + offset`. Skips the family if the base item does not exist.
     * @param target Hashmap to write variants into.
     * @param baseTypeId Type identifier of the base item from {@link HardCodedChestsItemsData}.
     * @param variants Hashmap of variant type identifiers and their fractional offsets.
     */
    private static addVariants(
        target: Map<string, number>,
        baseTypeId: string,
        variants: Readonly<Record<string, number>>,
    ): void {
        const baseIdentifier: number | undefined = HardCodedChestsItemsData.VANILLA_ITEMS.get(baseTypeId)
        if (baseIdentifier === undefined) return
        for (const [typeId, offset] of Object.entries(variants)) {
            target.set(typeId, baseIdentifier + offset)
        }
    }

    /**
     * @summary Builds color variant offsets.
     * @description Creates a hashmap of colored type identifiers from a color offset map and an item suffix (e.g. `banner`, `bed`).
     * @param suffix Suffix appended after the color name in the type identifier.
     * @param colors Color offset hashmap, such as {@link DataChestsItemsData.COLORS_OFFSETS}.
     * @returns Hashmap of colored type identifiers and their fractional offsets.
     */
    private static colorVariantOffsets(
        suffix: string,
        colors: Readonly<Record<string, number>>,
    ): Record<string, number> {
        const variants: Record<string, number> = {}
        for (const [color, offset] of Object.entries(colors)) {
            variants[`minecraft:${color.toLowerCase()}_${suffix}`] = offset
        }
        return variants
    }

    /**
     * @summary Builds sequential numeric variant offsets.
     * @description Creates a hashmap of numbered type identifiers (e.g. stages, charges, layers) for a given prefix and range.
     * @param prefix Prefix of the type identifier, including trailing underscore when needed.
     * @param min Inclusive start of the numeric range.
     * @param max Inclusive end of the numeric range.
     * @param offsetFromIndex Optional function that maps an index to a fractional offset. Defaults to `index / 65536`.
     * @returns Hashmap of numbered type identifiers and their fractional offsets.
     */
    private static rangedVariantOffsets(
        prefix: string,
        min: number,
        max: number,
        offsetFromIndex: (_index: number) => number = (index: number): number => index / 65536,
    ): Record<string, number> {
        const variants: Record<string, number> = {}
        for (let index: number = min; index <= max; index++) {
            variants[`${prefix}${index}`] = offsetFromIndex(index)
        }
        return variants
    }

    /**
     * @summary Builds potion-family variant offsets.
     * @description Creates potion, splash potion or lingering potion type identifiers from {@link DataChestsItemsData.POTION_EFFECT_OFFSETS}.
     * @param suffix Suffix appended after the effect name (`potion`, `splash_potion` or `lingering_potion`).
     * @returns Hashmap of potion type identifiers and their fractional offsets.
     */
    private static potionVariantOffsets(suffix: string): Record<string, number> {
        const variants: Record<string, number> = {}
        for (const [effect, offset] of Object.entries(DataChestsItemsData.POTION_EFFECT_OFFSETS)) {
            variants[`minecraft:${effect}_${suffix}`] = offset
        }
        return variants
    }

    /**
     * @summary Generates a hashmap with additional variants of items.
     * @description Method generates a hashmap with missing variants (e.g. colors) of existing items in {@link HardCodedChestsItemsData}. It depends directly on the hashmap from `HardCodedChestsItemsData.VANILLA_ITEMS`.
     */
    private static generateVanillaItemsVariantsHashmap(): ReadonlyMap<string, number> {
        const additionalItems: Map<string, number> = new Map<string, number>()

        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:respawn_anchor",
            DataChestsItemsData.rangedVariantOffsets("minecraft:respawn_anchor_charge_", 0, 4),
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:barrel", {
            "minecraft:barrel_closed": 0,
            "minecraft:barrel_open": 1 / 65536,
        })
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:redstone_wire",
            DataChestsItemsData.rangedVariantOffsets("minecraft:redstone_wire_power_", 0, 15),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:wheat_plant",
            DataChestsItemsData.rangedVariantOffsets("minecraft:wheat_plant_stage_", 0, 7),
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:farmland", {
            "minecraft:wet_farmland": 1 / 65536,
        })
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:snow_layer",
            DataChestsItemsData.rangedVariantOffsets(
                "minecraft:snow_layer_",
                1,
                8,
                (index: number): number => (index - 1) / 65536,
            ),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:cake_block",
            DataChestsItemsData.rangedVariantOffsets("minecraft:cake_block_slice_", 0, 6),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:brown_mushroom_block",
            DataChestsItemsData.rangedVariantOffsets("minecraft:brown_mushroom_block_bit_", 0, 15),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:red_mushroom_block",
            DataChestsItemsData.rangedVariantOffsets("minecraft:red_mushroom_block_bit_", 0, 15),
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:pumpkin_stem", {
            "minecraft:attached_pumpkin_stem": 1 / 65536,
        })
        DataChestsItemsData.addVariants(additionalItems, "minecraft:melon_stem", {
            "minecraft:attached_melon_stem": 1 / 65536,
        })
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:nether_wart_plant",
            DataChestsItemsData.rangedVariantOffsets("minecraft:nether_wart_plant_stage_", 0, 3),
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:end_portal_frame", {
            "minecraft:filled_end_portal_frame": 4 / 65536,
        })
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:cocoa",
            DataChestsItemsData.rangedVariantOffsets("minecraft:cocoa_stage_", 0, 3),
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:command_block", {
            "minecraft:conditional_command_block": 8 / 65536,
        })
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:carrots",
            DataChestsItemsData.rangedVariantOffsets("minecraft:carrots_stage_", 0, 7),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:potatoes",
            DataChestsItemsData.rangedVariantOffsets("minecraft:potatoes_stage_", 0, 7),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:standing_banner",
            DataChestsItemsData.colorVariantOffsets("standing_banner", DataChestsItemsData.COLORS_OFFSETS),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:wall_banner",
            DataChestsItemsData.colorVariantOffsets("wall_banner", DataChestsItemsData.COLORS_OFFSETS),
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:repeating_command_block", {
            "minecraft:conditional_repeating_command_block": 8 / 65536,
        })
        DataChestsItemsData.addVariants(additionalItems, "minecraft:chain_command_block", {
            "minecraft:conditional_chain_command_block": 8 / 65536,
        })
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:beetroots",
            DataChestsItemsData.rangedVariantOffsets("minecraft:beetroots_stage_", 0, 7),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:structure_block",
            DataChestsItemsData.STRUCTURE_BLOCK_OFFSETS,
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:arrow", DataChestsItemsData.ARROW_OFFSETS)
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:bed",
            DataChestsItemsData.colorVariantOffsets("bed", DataChestsItemsData.WHITE_FIRST_COLORS_OFFSETS),
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:filled_map", DataChestsItemsData.MAP_OFFSETS)
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:potion",
            DataChestsItemsData.potionVariantOffsets("potion"),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:splash_potion",
            DataChestsItemsData.potionVariantOffsets("splash_potion"),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:lingering_potion",
            DataChestsItemsData.potionVariantOffsets("lingering_potion"),
        )
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:banner",
            DataChestsItemsData.colorVariantOffsets("banner", DataChestsItemsData.COLORS_OFFSETS),
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:compound", DataChestsItemsData.COMPOUND_OFFSETS)
        DataChestsItemsData.addVariants(
            additionalItems,
            "minecraft:balloon",
            DataChestsItemsData.colorVariantOffsets("balloon", DataChestsItemsData.WHITE_FIRST_COLORS_OFFSETS),
        )
        DataChestsItemsData.addVariants(additionalItems, "minecraft:medicine", DataChestsItemsData.MEDICINE_OFFSETS)
        DataChestsItemsData.addVariants(additionalItems, "minecraft:sparkler", DataChestsItemsData.SPARKLER_OFFSETS)
        DataChestsItemsData.addVariants(additionalItems, "minecraft:glow_stick", DataChestsItemsData.GLOWSTICK_OFFSETS)

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
