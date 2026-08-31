/**
 * @summary Error that indicates that slot exceeds form's size.
 * @description This error is thrown by form's `setButton` method if the slot exceed's form size.
 * @example
 * ```ts
 * import { ChestFormData } from "@oliverperzyk/bedrock-chests"
 * import { ItemStack } from "@minecraft/server"
 *
 * const form: ChestFormData = new ChestFormData(27)
 * // This line of code will throw SlotNotInRangeFormError.
 * form.setButton(30, new ItemStack("minecraft:stick", 1))
 * ```
 */
class SlotNotInRangeFormError extends Error {
    /**
     * @summary Creates an error that indicates that slot exceeds form's size.
     * @param slot Index of a slot, that developer tried to set the item on.
     * @param formSize Size of a form.
     * @returns Instance of an error.
     */
    public constructor(
        public readonly slot: number,
        public readonly formSize: number,
    ) {
        super(`Slot (${slot}) exceeds form's size (${formSize}) limit.`)
        this.name = "SlotNotInRangeFormError"
        Object.setPrototypeOf(this, SlotNotInRangeFormError.prototype)
    }
}

export { SlotNotInRangeFormError }
