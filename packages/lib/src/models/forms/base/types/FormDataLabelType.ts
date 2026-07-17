import type { RawMessage } from "@minecraft/server";

/**
 * @summary Type that represents a label of a form.
 * @description Type that represents a label of a form. It can be a string or a raw message.
 * @example
 * ```ts
 * import { FormDataLabelType, ChestFormData } from "@oliverperzyk/chest-ui"
 * 
 * const label: FormDataLabelType = "Hello, world!"
 * const alsoLabel: FormDataLabelType = {
 *      translate: "forms.settings.title"
 * }
 * 
 * const chestForm: ChestFormData = new ChestFormData(27)
 *      .setTitle(label)
 *      .setButton(0, alsoLabel, "minecraft:stick", 1)
 * ```
 */
type FormDataLabelType = string | RawMessage

export type { FormDataLabelType }