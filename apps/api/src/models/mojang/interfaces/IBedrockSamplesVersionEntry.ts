/**
 * @summary A version record from Mojang bedrock-samples.
 * @description Object under `latest` (and each version key) in `version.json`.
 */
interface IBedrockSamplesVersionEntry {
    /**
     * @summary Minecraft version string.
     * @description Value in `X.Y.Z` or `X.Y.Z.W` form used as the dumped identifiers file name.
     */
    readonly version: string
}

export type { IBedrockSamplesVersionEntry }
