import type { FormButtonMode } from "../enums/FormButtonMode"

/**
 * @summary Interface that represents the label information of a form button.
 * @description This interface is used to represent the label information of a form button.
 */
interface IFormDataButtonLabelInformation {
    /**
     * @summary Label of the button.
     * @description This label is used to represent the label of the button.
     */
    readonly label: readonly string[]
    /**
     * @summary Image of the button.
     * @description This image is used to represent the item or image that will be displayed on the button.
     */
    readonly image: string
    /**
     * @summary Mode of the button.
     * @description This determines how the button will be displayed.
     */
    readonly mode: FormButtonMode
}

export type { IFormDataButtonLabelInformation }
