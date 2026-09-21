import type { IItemsIdentifiers } from "@/oliverperzyk/models/services/system/interfaces/IItemsIdentifiers"
import { existsSync } from "fs"
import { readdir, readFile } from "fs/promises"
import { join } from "path"

/**
 * @summary Service for item identifier JSON files.
 * @description Resolves, checks, and reads versioned files under `public/configuration/json/items/contents`.
 */
class ItemFilesSystemService {
    /**
     * @summary File extension of identifier dump files.
     * @description Used to recognize `{version}.json` files when listing and reading dumps.
     */
    private static readonly JSON_FILE_EXTENSION: string = ".json"

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
     * @summary Directory that stores dumped identifier files.
     * @description Resolves `public/configuration/json/items/contents` relative to the process working directory.
     */
    private static get IDENTIFIERS_DIRECTORY(): string {
        return join(process.cwd(), "public", "configuration", "json", "items", "contents")
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
     * @summary Absolute path of this instance's identifiers file.
     * @description Joins {@link IDENTIFIERS_DIRECTORY} with `{version}.json`.
     */
    private get filePath(): string {
        return join(
            ItemFilesSystemService.IDENTIFIERS_DIRECTORY,
            `${this.version}${ItemFilesSystemService.JSON_FILE_EXTENSION}`,
        )
    }

    /**
     * @summary Checks if the identifiers file exists.
     * @description Looks for `public/configuration/json/items/contents/{version}.json` relative to the process working directory.
     * @returns True if the file exists, false otherwise.
     */
    public exists(): boolean {
        return existsSync(this.filePath)
    }

    /**
     * @summary Reads the items identifiers file.
     * @description Parses `public/configuration/json/items/contents/{version}.json` as JSON. Returns null if the file is missing or not valid JSON.
     * @returns The parsed identifiers, or null if the file content is not valid JSON.
     */
    public async read(): Promise<IItemsIdentifiers | null> {
        if (!this.exists()) return null
        const fileContent: string = await readFile(this.filePath, "utf-8")
        try {
            return JSON.parse(fileContent)
        } catch {
            return null
        }
    }

    /**
     * @summary Resolves the newest dumped identifiers version.
     * @description Lists valid `{version}.json` files in {@link IDENTIFIERS_DIRECTORY} and returns the highest version, or null when none exist.
     * @returns The latest version identifier, or null if no dump files are present.
     */
    public static async getLatestVersionIdentifier(): Promise<string | null> {
        const directoryPath: string = this.IDENTIFIERS_DIRECTORY
        if (!existsSync(directoryPath)) return null

        const fileNames: string[] = await readdir(directoryPath)
        const versions: string[] = []
        for (const fileName of fileNames) {
            if (!fileName.endsWith(this.JSON_FILE_EXTENSION)) continue
            const version: string = fileName.slice(0, -this.JSON_FILE_EXTENSION.length)
            if (!this.isValid(version)) continue
            versions.push(version)
        }
        if (versions.length === 0) return null

        versions.sort((left: string, right: string): number => this.compareVersions(left, right))
        return versions[versions.length - 1] ?? null
    }

    /**
     * @summary Compares two Minecraft version identifiers.
     * @description Splits each version on `.` and compares components numerically, treating missing parts as `0`.
     * @param left - The first version identifier.
     * @param right - The second version identifier.
     * @returns A negative number when `left` is older, positive when newer, or `0` when equal.
     */
    private static compareVersions(left: string, right: string): number {
        const leftParts: number[] = left.split(".").map((part: string): number => Number(part))
        const rightParts: number[] = right.split(".").map((part: string): number => Number(part))
        const length: number = Math.max(leftParts.length, rightParts.length)
        for (let index: number = 0; index < length; index++) {
            const leftValue: number = leftParts[index] ?? 0
            const rightValue: number = rightParts[index] ?? 0
            if (leftValue !== rightValue) return leftValue - rightValue
        }
        return 0
    }
}

export { ItemFilesSystemService }
