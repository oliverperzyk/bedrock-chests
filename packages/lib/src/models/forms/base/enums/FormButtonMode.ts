/**
 * @summary Enum that represents the mode of a form button.
 * @description This enum is used to represent the mode of a form button.
 */
enum FormButtonMode {
    /**
     * @summary Regular mode.
     * @description This mode is used to represent a regular button. It will be visible and clickable.
     */
    REGULAR = "regular",
    /**
     * @summary Hidden mode.
     * @description This mode is used to represent a hidden button. It will be completly hidden from the form.
     */
    HIDDEN = "hidden",
    /**
     * @summary Disabled mode.
     * @description This mode is used to represent a disabled button. It will be visible but not clickable.
     */
    DISABLED = "disabled",
}

export { FormButtonMode }
