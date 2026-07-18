import { ItemStack, type RawMessage, type Player } from "@minecraft/server"
import { ActionFormData, type ActionFormResponse, FormCancelationReason } from "@minecraft/server-ui"
import type { IFormDataButtonsItemOptions } from "../../models/forms/base/interfaces/IFormDataButtonsItemOptions"
import type { FormDataSetButtonArguments } from "../../models/forms/base/types/FormDataSetButtonArguments"
import { SlotNotInRangeFormError } from "../../models/builders/process-errors/SlotNotInRangeFormError"

/**
 * @summary Base class for all forms.
 * @description Abstract class that includes basic properties for all forms.
 */
abstract class BaseFormData {
    /**
     * @summary Size of a form.
     * @description Indicates how big will be the form. It does not cover any grid part, as each type of form is unique.
     */
    protected abstract size: number
    /**
     * @summary Title of a form.
     * @description Stores a title of a form. This field should not include the part that is required by JSON UI in a resource pack later.
     */
    protected abstract title: string | RawMessage
    /**
     * @summary Buttons of a form.
     * @description Hashmap that includes parsed content of all buttons.
     */
    protected buttons: [string, string][] = []
    /**
     * @summary Determines if slots that are completly undefined might be clicked.
     * @description If it's set to true, slots in a form will no item might be clicked.
     */
    protected emptySlotsClickable: boolean = false

    /**
     * @summary Constructor of a form.
     * @description It's empty for now, as it does not include anything revelant.
     */
    public constructor() {}

    /**
     * @summary Reinitializes empty slots.
     * @description Reinitializes empty slots of a form, after the size is changed.
     * @remarks This method is called automatically when the size is changed. You should not call it manually, unless you know what you are doing.
     */
    private reinitializeEmptySlots(): void {
        if (this.buttons.length > this.size) {
            this.buttons = this.buttons.slice(0, this.size)
        } else {
            for (let i: number = this.buttons.length; i < this.size; i++) {
                this.buttons[i] = ["§r", ""]
            }
        }
    }

    /**
     * @summary Sets a title of a form.
     * @description Sets a display part of the title of a form.
     * @param title Title of a form that'll be displayed.
     * @returns Updated instance of the form.
     */
    public abstract setTitle(_title: string): this
    /**
     * @summary Sets an item from it's instance on a certain slot of a chest.
     * @param slot Slot that it'll be placed on.
     * @param itemStack Instance of an item from.
     * @returns Updated instance of the form.
     */
    public setButton(_slot: number, _itemStack: ItemStack): this
    /**
     * @summary Sets an item from it's instance on a certain slot of a chest.
     * @param slot Slot that it'll be placed on.
     * @param label Label of a button.
     * @param typeId Type ID of an item.
     * @param itemsOptions Options of an item.
     * @returns Updated instance of the form.
     */
    public setButton(
        _slot: number,
        _label: string | readonly string[],
        _typeId: string,
        _itemsOptions?: IFormDataButtonsItemOptions,
    ): this
    public setButton(slot: number, ...args: FormDataSetButtonArguments): this {
        if (slot < this.size) {
            throw new SlotNotInRangeFormError(slot, this.size)
        }

        let label: string | RawMessage
        const itemImageInformation: string = ""
        if (args[0] instanceof ItemStack) {
            const [itemStack] = args
            label = {
                rawtext: [
                    itemStack.nameTag
                        ? {
                              text: itemStack.nameTag,
                          }
                        : {
                              translate: itemStack.localizationKey,
                          },
                    ...itemStack.getRawLore(),
                ],
            }
        } else {
            const [labelArgument] = args
            label = Array.isArray(labelArgument) ? labelArgument.join("\n") : (labelArgument as string)
        }

        this.buttons.splice(slot, 1, [
            Array.isArray(label) ? label.join("\n") : (label as string),
            itemImageInformation,
        ])
        return this
    }

    /**
     * @summary Gets a raw form of a form.
     * @description Gets a raw form of a form, that can be used to show the form to a player.
     * @returns Raw form of a form.
     */
    public abstract get rawForm(): ActionFormData

    /**
     * @summary Shows a form to a player.
     * @description Shows a form to a player, with a certain timeout.
     * @param player Player that will see the form.
     * @param millisecondsWindow Time in milliseconds that the library will try to show the form to a player.
     * @returns Response of a form, if the form was shown successfully. If it was not shown successfully, the function will return a response with a cancelation reason of user's busy:
     * ```ts
     * {
     *   canceled: true,
     *   cancelationReason: FormCancelationReason.UserBusy
     * }
     * ```
     */
    public async show(player: Player, millisecondsWindow: number = 5000): Promise<ActionFormResponse> {
        const rawForm: ActionFormData = this.rawForm
        const currentTimestamp: number = Date.now()
        while (currentTimestamp > Date.now() + millisecondsWindow) {
            try {
                const resultData: ActionFormResponse = await rawForm.show(player)
                if (resultData.cancelationReason !== FormCancelationReason.UserBusy) return resultData
            } catch {
                continue
            }
        }

        return {
            canceled: true,
            cancelationReason: FormCancelationReason.UserBusy,
        }
    }
}

export { BaseFormData }
