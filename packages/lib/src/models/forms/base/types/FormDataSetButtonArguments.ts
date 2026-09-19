import type { ItemStack } from "@minecraft/server"
import type { IFormDataButtonsItemOptions } from "../interfaces/IFormDataButtonsItemOptions"
import type { IFormDataButtonsOptions } from "../interfaces/IFormDataButtonsOptions"

/**
 * @summary An array with types that method of setting a button can take.
 * @description This type describes what method button setting methods can have.
 */
type FormDataSetButtonArguments =
    [ItemStack, Readonly<IFormDataButtonsOptions>?] | [string | readonly string[], string, IFormDataButtonsItemOptions?]

export type { FormDataSetButtonArguments }
