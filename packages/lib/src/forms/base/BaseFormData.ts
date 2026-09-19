import { ItemStack, type RawMessage, type Player } from "@minecraft/server"
import { ActionFormData, type ActionFormResponse, FormCancelationReason } from "@minecraft/server-ui"
import type { IFormDataButtonsItemOptions } from "../../models/forms/base/interfaces/IFormDataButtonsItemOptions"
import type { FormDataSetButtonArguments } from "../../models/forms/base/types/FormDataSetButtonArguments"
import { SlotNotInRangeFormError } from "../../models/builders/process-errors/SlotNotInRangeFormError"
import type { IFormDataButtonLabelInformation } from "../../models/forms/base/interfaces/IFormDataButtonLabelInformation"
import { FormButtonMode } from "../../models/forms/base/enums/FormButtonMode"
import type { IFormDataButtonsOptions } from "../../models/forms/base/interfaces/IFormDataButtonsOptions"
import { IChestFormSize } from "../../models/forms/chest/interfaces/IChestFormSize"

/**
 * @summary Base class for all forms.
 * @description Abstract class that includes basic properties for all forms.
 * @remarks If you extend this class, you should call `super()` in your constructor at the very beginning, as it
 * initialized the empty slots inside data.
 */
abstract class BaseFormData {
    /**
     * @summary Size of a form.
     * @description Indicates how big will be the form. It does not cover any grid part, as each type of form is unique.
     */
    protected abstract size: Readonly<IChestFormSize> | number
    /**
     * @summary Title of a form.
     * @description Stores a title of a form. This field should not include the part that is required by JSON UI in a resource pack later.
     */
    protected abstract title: string | RawMessage
    /**
     * @summary Buttons of a form.
     * @description Hashmap that includes parsed content of all buttons.
     */
    protected buttons: IFormDataButtonLabelInformation[] = []
    /**
     * @summary Determines if slots that are completly undefined might be clicked.
     * @description If it's set to true, slots in a form will no item might be clicked.
     */
    protected emptySlotsClickable: boolean = false
    /**
     * @summary Determines if the inventory is visible.
     * @description If it's set to true, the inventory will be visible.
     */
    protected isInventoryVisible: boolean = true

    /**
     * @summary Stringifies button information to a raw label.
     * @description Stringifies button information to a raw label.
     * @param label Label of a button.
     * @param mode Mode of a button.
     * @returns Raw label of a button.
     */
    protected stringifyButtonInformationToRawLabel(
        _label: readonly string[] | readonly RawMessage[],
        _mode: FormButtonMode,
    ): RawMessage {
        return {}
    }

    /**
     * @summary Gets the amount of slots of a form.
     * @description Gets the amount of slots of a form, based on the size of the form.
     * @returns Amount of slots of a form.
     * @remarks Used only internally, as it's used to validate slot ranges in other methods.
     */
    protected get slotsAmount(): number {
        return typeof this.size === "number" ? this.size : this.size.width * this.size.height
    }

    /**
     * @summary Constructor of a form.
     * @description It's empty for now, as it does not include anything revelant.
     */
    public constructor() {
        this.reinitializeEmptySlots()
    }

    /**
     * @summary Reinitializes empty slots.
     * @description Reinitializes empty slots of a form, after the size is changed.
     * @remarks This method is called automatically when the size is changed. You should not call it manually, unless you know what you are doing.
     */
    private reinitializeEmptySlots(): void {
        const size: number = this.slotsAmount
        if (this.buttons.length > size) {
            this.buttons = this.buttons.slice(0, size)
        } else {
            for (let i: number = this.buttons.length; i < size; i++) {
                this.buttons[i] = {
                    label: ["§r"],
                    image: "",
                    mode: FormButtonMode.REGULAR,
                }
            }
        }
    }

    /**
     * @summary Sets a title of a form.
     * @description Sets a display part of the title of a form.
     * @param title Title of a form that'll be displayed.
     * @returns Updated instance of the form.
     */
    public setTitle(title: string | RawMessage): this {
        this.title = title
        return this
    }

    /**
     * @summary Sets if the inventory is visible.
     * @description Sets if the inventory is visible.
     * @param isInventoryVisible If the inventory is visible.
     * @returns Updated instance of the form.
     */
    public setIsInventoryVisible(isInventoryVisible: boolean): this {
        this.isInventoryVisible = isInventoryVisible
        return this
    }

    /**
     * @summary Sets if the empty slots are clickable.
     * @description Sets if the empty slots are clickable.
     * @param emptySlotsClickable If the empty slots are clickable.
     * @returns Updated instance of the form.
     */
    public setEmptySlotsClickable(emptySlotsClickable: boolean): this {
        this.emptySlotsClickable = emptySlotsClickable
        return this
    }

    /**
     * @summary Sets an item from it's instance on a certain slot of a chest.
     * @param slot Slot that it'll be placed on.
     * @param itemStack Instance of an item from.
     * @param buttonOptions Options of a button.
     * @returns Updated instance of the form.
     */
    public setButton(_slot: number, _itemStack: ItemStack, _buttonOptions?: Readonly<IFormDataButtonsOptions>): this
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
    // @internal Overloading method.
    public setButton(slot: number, ...args: FormDataSetButtonArguments): this {
        const size: number = this.slotsAmount
        if (slot < size) {
            throw new SlotNotInRangeFormError(slot, size)
        }

        const firstArgument: ItemStack | string | readonly string[] = args[0]
        let label: readonly string[]
        const itemImageInformation: string = ""
        let mode: FormButtonMode
        if (firstArgument instanceof ItemStack) {
            const buttonOptions: Readonly<IFormDataButtonsOptions> | undefined =
                typeof args[1] === "string" ? undefined : args[1]
            label = [firstArgument.nameTag ?? firstArgument.localizationKey, ...firstArgument.getLore()]
            mode = buttonOptions?.mode ?? FormButtonMode.REGULAR
        } else {
            const itemsOptions: IFormDataButtonsItemOptions | undefined = args[2]
            label = Array.isArray(firstArgument) ? firstArgument : [firstArgument]
            mode = itemsOptions?.mode ?? FormButtonMode.REGULAR
        }

        this.buttons.splice(slot, 1, {
            label,
            image: itemImageInformation,
            mode,
        })
        return this
    }

    /**
     * @summary Gets a raw form of a form.
     * @description Gets a raw form of a form, that can be used to show the form to a player.
     * @returns Raw form of a form.
     * @remarks This function is not callable in read-only mode.
     */
    public abstract get rawForm(): ActionFormData

    /**
     * @summary Shows a form to a player.
     * @description Shows a form to a player, with a certain timeout.
     * @param player Player that will see the form.
     * @param millisecondsWindow Time in milliseconds that the library will try to show the form to a player.
     * @returns Response of a form, if the form was shown successfully. If it was not shown successfully, the function will return a response with a cancelation reason of user's busy:
     * @remarks This function is not callable in read-only mode.
     * ```ts
     * {
     *   canceled: true,
     *   // UserBusy is returned when a loop is not able to show the form to a player,
     *   // because the player is busy with another form while being AFK.
     *   cancelationReason: FormCancelationReason.UserBusy
     * }
     * ```
     */
    public async show(player: Player, millisecondsWindow: number = 5000): Promise<ActionFormResponse> {
        const rawForm: ActionFormData = this.rawForm
        const currentTimestamp: number = Date.now()
        while (currentTimestamp > Date.now() - millisecondsWindow) {
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
