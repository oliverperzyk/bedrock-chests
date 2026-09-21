import type { IBedrockSamplesVersionEntry } from "@/oliverperzyk/models/mojang/interfaces/IBedrockSamplesVersionEntry"
import type { IBedrockSamplesVersionManifest } from "@/oliverperzyk/models/mojang/interfaces/IBedrockSamplesVersionManifest"
import type { IItemsIdentifiers } from "@/oliverperzyk/models/services/system/interfaces/IItemsIdentifiers"
import type { IMojangItem } from "@/oliverperzyk/models/mojang/interfaces/IMojangItem"
import type { IMojangItemsModule } from "@/oliverperzyk/models/mojang/interfaces/IMojangItemsModule"
import { ItemFilesSystemService } from "@/oliverperzyk/services/system/ItemFilesSystemService"
import { writeFile } from "fs/promises"
import { join } from "path"
import { exit } from "process"

/**
 * @summary Script that dumps vanilla Minecraft item identifier mappings.
 * @description Fetches Mojang bedrock-samples metadata and writes a schema-valid `{version}.json` file under `public/configuration/json/items`.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class DumpVanillaMappingsScript {
    /**
     * @summary Private constructor.
     * @description Prevents instantiation and inheritance of the dump script class.
     */
    private constructor() {}

    /**
     * @summary URL of the bedrock-samples version manifest.
     * @description Raw GitHub URL for `version.json` on the `main` branch of Mojang/bedrock-samples.
     */
    private static readonly BEDROCK_SAMPLES_VERSION_MANIFEST_URL: string =
        "https://raw.githubusercontent.com/Mojang/bedrock-samples/main/version.json"

    /**
     * @summary URL of the Mojang vanilla items module.
     * @description Raw GitHub URL for `mojang-items.json` on the `main` branch of Mojang/bedrock-samples.
     */
    private static readonly MOJANG_ITEMS_URL: string =
        "https://raw.githubusercontent.com/Mojang/bedrock-samples/main/metadata/vanilladata_modules/mojang-items.json"

    /**
     * @summary JSON Schema reference written into the dump file.
     * @description Relative path to `ItemsIdentifiers.schema.json` in the same directory as the output file.
     */
    private static readonly SCHEMA_REFERENCE: string = "./ItemsIdentifiers.schema.json"

    /**
     * @summary Directory where identifier dump files are written.
     * @description Resolves to `public/configuration/json/items` relative to this script file.
     */
    private static readonly OUTPUT_DIRECTORY: string = join(
        import.meta.dirname,
        "..",
        "public",
        "configuration",
        "json",
        "items",
        "contents",
    )

    /**
     * @summary Static initializer.
     * @description Starts the dump process when the script is executed.
     */
    static {
        void this.init()
    }

    /**
     * @summary Runs the vanilla mappings dump.
     * @description Fetches the latest version and item metadata, then writes the identifiers file or exits with an error.
     */
    private static async init(): Promise<void> {
        try {
            const version: string = await this.fetchLatestVersion()
            const items: Record<string, number> = await this.fetchItemMappings()
            const payload: IItemsIdentifiers = {
                $schema: this.SCHEMA_REFERENCE,
                items,
            }
            const outputPath: string = join(this.OUTPUT_DIRECTORY, `${version}.json`)
            await writeFile(outputPath, `${JSON.stringify(payload, null, 4)}\n`, "utf-8")
            console.log(`Wrote ${Object.keys(items).length} item mappings to ${outputPath}`)
        } catch (error: unknown) {
            const message: string = error instanceof Error ? error.message : String(error)
            console.error(message)
            exit(1)
        }
    }

    /**
     * @summary Fetches the latest Minecraft version from bedrock-samples.
     * @description Downloads `version.json`, reads `latest.version`, and rejects values that fail {@link ItemFilesSystemService.isValid}.
     * @returns The latest Minecraft version string.
     */
    private static async fetchLatestVersion(): Promise<string> {
        const manifest: IBedrockSamplesVersionManifest = await this.fetchJson(
            this.BEDROCK_SAMPLES_VERSION_MANIFEST_URL,
            (value: unknown): value is IBedrockSamplesVersionManifest => this.isBedrockSamplesVersionManifest(value),
            "Invalid bedrock-samples version manifest.",
        )
        const version: string = manifest.latest.version
        if (!ItemFilesSystemService.isValid(version)) {
            throw new Error(`Invalid latest Minecraft version: ${version}`)
        }
        return version
    }

    /**
     * @summary Fetches and maps vanilla item identifiers.
     * @description Downloads `mojang-items.json` and builds a `name` to `raw_id` record, skipping entries that cannot be mapped.
     * @returns A non-empty record of item names to numeric identifiers.
     */
    private static async fetchItemMappings(): Promise<Record<string, number>> {
        const itemsModule: IMojangItemsModule = await this.fetchJson(
            this.MOJANG_ITEMS_URL,
            (value: unknown): value is IMojangItemsModule => this.isMojangItemsModule(value),
            "Invalid Mojang items module.",
        )
        const items: Record<string, number> = {}
        for (const item of itemsModule.data_items) {
            if (!this.isMappableMojangItem(item)) continue
            items[item.name] = item.raw_id
        }
        if (Object.keys(items).length === 0) {
            throw new Error("No valid item mappings were found.")
        }
        return items
    }

    /**
     * @summary Fetches and validates JSON from a URL.
     * @description Performs an HTTP GET, parses the body as JSON, and narrows it with the provided type guard.
     * @param url - Absolute URL to fetch.
     * @param guard - Runtime type guard applied to the parsed JSON value.
     * @param invalidMessage - Error message used when the guard rejects the payload.
     * @returns The parsed and narrowed JSON value.
     */
    private static async fetchJson<T>(
        url: string,
        guard: (value: unknown) => value is T,
        invalidMessage: string,
    ): Promise<T> {
        const response: Response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`)
        }
        let parsed: unknown
        try {
            parsed = await response.json()
        } catch {
            throw new Error(`Failed to parse JSON from ${url}.`)
        }
        if (!guard(parsed)) {
            throw new Error(invalidMessage)
        }
        return parsed
    }

    /**
     * @summary Type guard for the bedrock-samples version manifest.
     * @description Accepts an object that contains a `latest` entry with a string `version` field.
     * @param value - Unknown value parsed from `version.json`.
     * @returns True when the value matches {@link IBedrockSamplesVersionManifest}.
     */
    private static isBedrockSamplesVersionManifest(value: unknown): value is IBedrockSamplesVersionManifest {
        if (typeof value !== "object" || value === null || !("latest" in value)) return false
        return this.isBedrockSamplesVersionEntry(value.latest)
    }

    /**
     * @summary Type guard for a bedrock-samples version entry.
     * @description Accepts an object whose `version` field is a string.
     * @param value - Unknown value expected to be the `latest` entry.
     * @returns True when the value matches {@link IBedrockSamplesVersionEntry}.
     */
    private static isBedrockSamplesVersionEntry(value: unknown): value is IBedrockSamplesVersionEntry {
        return typeof value === "object" && value !== null && "version" in value && typeof value.version === "string"
    }

    /**
     * @summary Type guard for the Mojang items module.
     * @description Accepts an object whose `data_items` field is an array; individual entries are filtered later.
     * @param value - Unknown value parsed from `mojang-items.json`.
     * @returns True when the value matches {@link IMojangItemsModule}.
     */
    private static isMojangItemsModule(value: unknown): value is IMojangItemsModule {
        return typeof value === "object" && value !== null && "data_items" in value && Array.isArray(value.data_items)
    }

    /**
     * @summary Checks whether a Mojang item can be written to the identifiers file.
     * @description Requires a non-empty `name` string and an integer `raw_id`, including negative identifiers.
     * @param item - Mojang item record from `data_items`.
     * @returns True when the item should be included in the dump.
     */
    private static isMappableMojangItem(item: IMojangItem): boolean {
        return (
            typeof item === "object" &&
            item !== null &&
            typeof item.name === "string" &&
            item.name.length > 0 &&
            Number.isInteger(item.raw_id)
        )
    }
}
