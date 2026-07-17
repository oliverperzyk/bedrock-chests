import type { ItemStack } from "@minecraft/server";
import type { IFormDataButtonsItemOptions } from "../interfaces/IFormDataButtonsItemOptions";

/**
 * @summary An array with types that method of setting a button can take.
 * @description This type describes what method `BaseFormData.setButton` can have.
 */
type FormDataSetButtonArguments = [ItemStack] | [string | readonly string[], string, IFormDataButtonsItemOptions?]

export type { FormDataSetButtonArguments }
