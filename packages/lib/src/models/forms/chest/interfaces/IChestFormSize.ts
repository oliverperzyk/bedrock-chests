/**
 * @summary Interface that represents a chest form size.
 * @description This interface is used to represent a chest form size.
 */
interface IChestFormSize {
    /**
     * @summary Width (in slots) of the chest form.
     * @description This width is used to store the width of the chest form.
     */
    readonly width: number
    /**
     * @summary Height (in slots) of the chest form.
     * @description This height is used to store the height of the chest form.
     */
    readonly height: number
}

export { IChestFormSize }
