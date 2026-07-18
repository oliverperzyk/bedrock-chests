/* eslint-disable no-unused-vars */

/**
 * @summary Enumeration of all possible locations of a selected value in a chest form.
 * @description This enumeration is used to determine the location of a selected value in a chest form.
 */
const enum ChestFormSelectedValueLocation {
    /**
     * @summary The selected value is from the inventory.
     * @description This location is used when the selected value is from the inventory.
     */
    INVENTORY = "inventory",
    /**
     * @summary The selected value is from the chest.
     * @description This location is used when the selected value is from the chest.
     */
    CHEST = "chest",
}

export { ChestFormSelectedValueLocation }
