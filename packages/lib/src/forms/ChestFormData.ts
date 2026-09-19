import type { ItemStack, Player } from "@minecraft/server"
import type { IBaseFormDataOptions } from "../models/forms/base/interfaces/IBaseFormDataOptions"
import type { IFormDataButtonsItemOptions } from "../models/forms/base/interfaces/IFormDataButtonsItemOptions"
import type { IFormDataButtonsOptions } from "../models/forms/base/interfaces/IFormDataButtonsOptions"
import type { FormDataSetButtonArguments } from "../models/forms/base/types/FormDataSetButtonArguments"
import type { IChestFormResponse } from "../models/forms/chest/interfaces/IChestFormResponse"
import type { IChestFormSize } from "../models/forms/chest/interfaces/IChestFormSize"
import { ActionFormData, type ActionFormResponse } from "@minecraft/server-ui"
import { BaseFormData } from "./base/BaseFormData"
import { FormSelectedValueLocation } from "../models/forms/base/enums/ChestFormSelectedValueLocation"

/**
 * @summary Class that represents a chest form.
 * @description This class is used to represent a chest form.
 */
class ChestFormData extends BaseFormData {
    /**
     * @summary Prefix of the form.
     * @description This prefix is used to prefix the title of the form.
     */
    private static readonly FORM_PREFIX: string = "§c§h§e§s§t§r"
    /**
     * @summary Size of the form.
     * @description This size is used to store the size of the form.
     */
    protected readonly size: Readonly<IChestFormSize>

    /**
     * @summary Private constructor.
     * @description Private constructor is to prevent instanization & inheritance.
     * @param size - The size of the form.
     * @param options - The options of the form.
     */
    public constructor(size: IChestFormSize, options?: Readonly<IBaseFormDataOptions>) {
        super()
        this.size = size
        this.options = {
            displayInventory: options?.displayInventory ?? true,
            reactToInventoryClicks: options?.reactToInventoryClicks ?? true,
        }

        this.title = {
            rawtext: [
                {
                    text: ChestFormData.FORM_PREFIX,
                },
                {
                    translate: "forms.chest.title",
                },
            ],
        }
    }

    /**
     * @summary Sets an item from it's instance on a certain slot of a chest.
     * @param slot Slot that it'll be placed on.
     * @param itemStack Instance of an item from.
     * @param buttonOptions Options of a button.
     * @returns Updated instance of the form.
     */

    public override setButton(
        slot: number,
        _itemStack: ItemStack,
        _buttonOptions?: Readonly<IFormDataButtonsOptions>,
    ): this
    /**
     * @summary Sets an item from it's instance on a certain slot of a chest.
     * @param slot Slot that it'll be placed on.
     * @param label Label of a button.
     * @param typeId Type ID of an item.
     * @param itemsOptions Options of an item.
     * @returns Updated instance of the form.
     */
    public override setButton(
        _slot: number,
        _label: string | readonly string[],
        _typeId: string,
        _itemsOptions?: IFormDataButtonsItemOptions,
    ): this

    // @internal Overloading method.
    public override setButton(slot: number, ...args: FormDataSetButtonArguments): this {
        return (super.setButton as (slot: number, ...args: FormDataSetButtonArguments) => this)(slot, ...args)
    }

    /**
     * @summary Gets the raw form data.
     * @description This method is used to get the raw form data.
     * @returns An instance of the ActionFormData class.
     * @remarks This function is not callable in read-only mode.
     */
    public get rawForm(): ActionFormData {
        const titlePrefix: string = `${ChestFormData.FORM_PREFIX}§${this.size.toString().padStart(2, "0")}#${this.options.displayInventory ? "1" : "0"}§r`
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
    public override async show(player: Player, millisecondsWindow: number = 5000): Promise<IChestFormResponse> {
        const actionFormResponse: ActionFormResponse = await super.show(player, millisecondsWindow)
        if (actionFormResponse.canceled)
            return {
                canceled: true,
                cancelationReason: actionFormResponse.cancelationReason!,
            }

        const totalSlots: number = this.size.width * this.size.height
        const definedSelection: number = actionFormResponse.selection!
        if (definedSelection < totalSlots) {
            return {
                canceled: false,
                selectedValue: {
                    slot: definedSelection,
                    location: FormSelectedValueLocation.FORM,
                },
            }
        } else {
            return {
                canceled: false,
                selectedValue: {
                    slot: definedSelection - totalSlots,
                    location: FormSelectedValueLocation.INVENTORY,
                },
            }
        }
    }
}

export { ChestFormData }
