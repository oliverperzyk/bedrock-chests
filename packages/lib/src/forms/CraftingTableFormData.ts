import type { ItemStack, Player } from "@minecraft/server"
import type { IBaseFormDataOptions } from "../models/forms/base/interfaces/IBaseFormDataOptions"
import type { IFormDataButtonsItemOptions } from "../models/forms/base/interfaces/IFormDataButtonsItemOptions"
import type { ICraftingTableFormResponse } from "../models/forms/crafting-table/interfaces/ICraftingTableFormResponse"
import { ActionFormData, type ActionFormResponse } from "@minecraft/server-ui"
import { BaseFormData } from "./base/BaseFormData"
import { FormDataSetButtonArguments } from "../models/forms/base/types/FormDataSetButtonArguments"
import { CraftingTableFormSelectedValueLocation } from "../models/forms/crafting-table/enums/CraftingTableFormSelectedValueLocation"

class CraftingTableFormData extends BaseFormData {
    private static readonly RESULT_SLOT: number = 9
    private static readonly FORM_PREFIX: string = "§c§r§a§f§t§i§n§g§r"
    protected readonly size: number = 10

    public constructor(options?: Readonly<IBaseFormDataOptions>) {
        super()
        this.options = {
            ...this.options,
            ...options,
        }

        this.title = {
            rawtext: [
                {
                    text: CraftingTableFormData.FORM_PREFIX,
                },
                {
                    translate: "forms.crafting_table.title",
                },
            ],
        }
    }

    /**
     * @summary Sets the recipe slot of a crafting table form.
     * @description Sets an item from it's instance on a certain slot of a crafting table.
     * @param slot Slot that it'll be placed on.
     * @param itemStack Instance of an item to display as the recipe.
     * @returns Updated instance of the form.
     */

    public setRecipeButton(slot: number, itemStack: ItemStack): this
    /**
     * @summary Sets the recipe slot of a crafting table form.
     * @description Sets an item from a label and type ID on a certain slot of a crafting table.
     * @param slot Slot that it'll be placed on.
     * @param label Label of a button.
     * @param typeId Type ID of an item.
     * @param itemsOptions Options of an item.
     * @returns Updated instance of the form.
     */
    public setRecipeButton(
        slot: number,
        label: string | readonly string[],
        typeId: string,
        itemsOptions?: IFormDataButtonsItemOptions,
    ): this

    // @internal Overloading method.
    public setRecipeButton(slot: number, ...args: FormDataSetButtonArguments): this {
        return (super.setButton as (slot: number, ...args: FormDataSetButtonArguments) => this)(slot, ...args)
    }

    /**
     * @summary Sets the result slot of a crafting table form.
     * @description Sets an item from it's instance on the result slot of a crafting table.
     * @param itemStack Instance of an item to display as the result.
     * @returns Updated instance of the form.
     */

    public setResultButton(itemStack: ItemStack): this
    /**
     * @summary Sets the result slot of a crafting table form.
     * @description Sets an item from a label and type ID on the result slot of a crafting table.
     * @param label Label of a button.
     * @param typeId Type ID of an item.
     * @param itemsOptions Options of an item.
     * @returns Updated instance of the form.
     */
    public setResultButton(
        label: string | readonly string[],
        typeId: string,
        itemsOptions?: IFormDataButtonsItemOptions,
    ): this

    // @internal Overloading method.
    public setResultButton(...args: FormDataSetButtonArguments): this {
        return (super.setButton as (slot: number, ...args: FormDataSetButtonArguments) => this)(9, ...args)
    }

    /**
     * @summary Gets the raw form data.
     * @description This method is used to get the raw form data.
     * @returns An instance of the ActionFormData class.
     * @remarks This function is not callable in read-only mode.
     */
    public get rawForm(): ActionFormData {
        const titlePrefix: string = `${CraftingTableFormData.FORM_PREFIX}§${this.size.toString().padStart(2, "0")}#${this.options.displayInventory ? "1" : "0"}§r`
        const actionFormData: ActionFormData = new ActionFormData().title(
            typeof this.title === "string"
                ? `${titlePrefix}${this.title.trim()}`
                : {
                      rawtext: [
                          {
                              text: titlePrefix,
                          },
                          {
                              ...this.title,
                          },
                      ],
                  },
        )

        for (const { label, image, mode } of this.buttons) {
            actionFormData.button(this.stringifyButtonInformationToRawLabel(label, mode), image)
        }

        return actionFormData
    }

    /**
     * @summary Shows the form to a player.
     * @description This method is used to show the form to a player.
     * @param player - The player to show the form to.
     * @param millisecondsWindow - The window of the form.
     * @remarks This function is not callable in read-only mode.
     * @returns A response of the form as a promise.
     */
    public override async show(player: Player, millisecondsWindow: number = 5000): Promise<ICraftingTableFormResponse> {
        const actionFormResponse: ActionFormResponse = await super.show(player, millisecondsWindow)
        if (actionFormResponse.canceled)
            return {
                canceled: true,
                cancelationReason: actionFormResponse.cancelationReason!,
            }

        const definedSelection: number = actionFormResponse.selection!
        if (definedSelection < this.size) {
            if (definedSelection === CraftingTableFormData.RESULT_SLOT) {
                return {
                    canceled: false,
                    selectedValue: {
                        location: CraftingTableFormSelectedValueLocation.RESULT,
                    },
                }
            }

            return {
                canceled: false,
                selectedValue: {
                    slot: definedSelection,
                    location: CraftingTableFormSelectedValueLocation.RECIPE,
                },
            }
        }

        return {
            canceled: false,
            selectedValue: {
                slot: definedSelection - this.size,
                location: CraftingTableFormSelectedValueLocation.INVENTORY,
            },
        }
    }
}

export { CraftingTableFormData }
