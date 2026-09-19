enum CraftingTableFormSelectedValueLocation {
    /**
     * @summary The selected value is from the inventory.
     * @description This location is used when the selected value is from the inventory.
     */
    INVENTORY = "inventory",
    /**
     * @summary The selected value is at the recipe slot from the crafting table form.
     * @description This location is used when the selected value is at the recipe slot from the crafting table form.
     */
    RECIPE = "recipe",
    /**
     * @summary The selected value is inside the form.
     * @description This location is used when the selected value is at the result slot from the crafting table form.
     */
    RESULT = "result",
}

export { CraftingTableFormSelectedValueLocation }
