import type { FormButtonMode } from "../enums/FormButtonMode"

/**
 * @summary Options of a button displayed in a form.
 * @description This allows to adjust how buttons look in a form. Interface is used only, when developer decides
 * to show a button in inventory using the `setButton` method with ItemStack instance argument.
 */
interface IFormDataButtonsOptions {
    /**
     * @summary Mode of the button.
     * @description This determines how the button will be displayed.
     * @default FormButtonMode.REGULAR
     */
    readonly mode: FormButtonMode
}

export type { IFormDataButtonsOptions }
