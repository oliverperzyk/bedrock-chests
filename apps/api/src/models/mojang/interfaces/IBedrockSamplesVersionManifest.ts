import type { IBedrockSamplesVersionEntry } from "./IBedrockSamplesVersionEntry"

/**
 * @summary Version manifest from Mojang bedrock-samples.
 * @description Root object of `version.json`, used to resolve the latest Minecraft version to dump.
 */
interface IBedrockSamplesVersionManifest {
    /**
     * @summary Latest published bedrock-samples version.
     * @description Entry whose `version` field names the identifiers file written by the dump script.
     */
    readonly latest: IBedrockSamplesVersionEntry
}

export type { IBedrockSamplesVersionManifest }
