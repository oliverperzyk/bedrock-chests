/**
 * @summary Options of an item displayed in a form.
 * @description This allows to adjust how items look in a form.
 */
interface IFormDataButtonsItemOptions {
    /**
     * @summary Amount that'll be displayed in a form.
     * @description A number that indicates amount of a certain item in a form.
     * @remarks This value is not capped because of vanilla restrictions. Because of that, you can display e.g. 32 ender pearls.
     */
    readonly amount?: number
    /**
     * @summary Whenever item should glow.
     * @description If this property is set to `true`, the item will glow in a form.
     * @remarks This value is not restricted by vanilla restrictions. Because of that, you can display e.g. glowing ender pearls.
     */
    readonly enchanted?: boolean
    /**
     * @summary Percentage of item's durability.
     * @description Form will add an additional durability bar if this property is defined.
     * @remarks This value is not restricted by vanilla restrictions. Because of that, you can display e.g. ender pearls with 50% of durability.
     */
    readonly durability?: number
}

export type { IFormDataButtonsItemOptions }
