import type { IItemsIdentifiers } from "@/oliverperzyk/models/services/system/interfaces/IItemsIdentifiers"
import { existsSync } from "fs"
import { readFile } from "fs/promises"
import { join } from "path"

/**
 * @summary Service for item identifier JSON files.
 * @description Resolves, checks, and reads versioned files under `public/configuration/json/items`.
 */
class ItemFilesSystemService {
    /**
     * @summary Checks if the version is valid.
     * @description Accepts a numeric `X.Y.Z` or `X.Y.Z.W` version string.
     * @param version - The version to check.
     * @returns True if the version is valid, false otherwise.
     */
    public static isValid(version: unknown): version is `${number}.${number}.${number}${`.${number}`}` {
        return typeof version === "string" && /^[0-9]+\.[0-9]+\.[0-9]+(\.[0-9]+)?$/.test(version)
    }

    /**
     * @summary Constructor for the ItemFilesSystemService class.
     * @description Binds the service to a versioned identifiers file. Throws if {@link isValid} rejects the version.
     * @param version - The Minecraft version used as the file name (`{version}.json`).
     */
    public constructor(private readonly version: string) {
        if (!ItemFilesSystemService.isValid(version)) throw new Error("Invalid version")
    }

    /**
     * @summary Checks if the identifiers file exists.
     * @description Looks for `public/configuration/json/items/{version}.json` relative to the process working directory.
     * @returns True if the file exists, false otherwise.
     */
    public exists(): boolean {
        const filePath: string = join(process.cwd(), "public", "configuration", "json", "items", `${this.version}.json`)
        return existsSync(filePath)
    }

    /**
     * @summary Reads the items identifiers file.
     * @description Parses `public/configuration/json/items/{version}.json` as JSON. Throws if the file is missing.
     * @returns The parsed identifiers, or null if the file content is not valid JSON.
     */
    public async read(): Promise<IItemsIdentifiers | null> {
        const filePath: string = join(process.cwd(), "public", "configuration", "json", "items", `${this.version}.json`)
        if (!this.exists()) return null
        const fileContent: string = await readFile(filePath, "utf-8")
        try {
            return JSON.parse(fileContent)
        } catch {
            return null
        }
    }
}

export { ItemFilesSystemService }
