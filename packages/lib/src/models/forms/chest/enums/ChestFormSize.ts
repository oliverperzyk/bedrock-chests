/**
 * @summary Enumeration of all possible sizes of a chest form.
 * @description This enumeration is used to determine the size of a chest form.
 */
const enum ChestFormSize {
    /**
     * @summary 9 slots chest form. (9x1)
     * @description This size includes 1 row.
     */
    CHEST_9 = 9,
    /**
     * @summary 18 slots chest form. (9x2)
     * @description This size includes 2 rows.
     */
    CHEST_18 = 18,
    /**
     * @summary 27 slots chest form. (9x3)
     * @description This is equal to a single chest, 3 rows.
     */
    CHEST_27 = 27,
    /**
     * @summary 36 slots chest form. (9x4)
     * @description This size includes 4 rows.
     */
    CHEST_36 = 36,
    /**
     * @summary 45 slots chest form. (9x5)
     * @description This size includes 5 rows.
     */
    CHEST_45 = 45,
    /**
     * @summary 54 slots chest form. (9x6)
     * @description This is equal to a double chest, 6 rows.
     */
    CHEST_54 = 54,
}

export { ChestFormSize }
