import type { Player, RawMessage } from "@minecraft/server"
import type { IBaseFormDataOptions } from "../models/forms/base/interfaces/IBaseFormDataOptions"
import type { ChestFormSize } from "../models/forms/chest/enums/ChestFormSize"
import { BaseFormData } from "./base/BaseFormData"
import { ActionFormData, type ActionFormResponse } from "@minecraft/server-ui"
import type { IChestFormResponse } from "../models/forms/chest/interfaces/IChestFormResponse"
import { ChestFormSelectedValueLocation } from "../models/forms/chest/enums/ChestFormSelectedValueLocation"

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
     * @summary Title of the form.
     * @description This title is used to store the title of the form.
     */
    protected title: string | RawMessage
    /**
     * @summary Size of the form.
     * @description This size is used to store the size of the form.
     */
    protected size: ChestFormSize
    /**
     * @summary Options of the form.
     * @description This options is used to store the options of the form.
     */
    private options: Readonly<IBaseFormDataOptions>

    /**
     * @summary Private constructor.
     * @description Private constructor is to prevent instanization & inheritance.
     * @param size - The size of the form.
     * @param options - The options of the form.
     */
    public constructor(size: ChestFormSize, options?: Readonly<IBaseFormDataOptions>) {
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

        const definedSelection: number = actionFormResponse.selection!
        if (definedSelection < this.size) {
            return {
                canceled: false,
                selectedValue: {
                    slot: definedSelection,
                    location: ChestFormSelectedValueLocation.CHEST,
                },
            }
        } else {
            return {
                canceled: false,
                selectedValue: {
                    slot: definedSelection - this.size,
                    location: ChestFormSelectedValueLocation.INVENTORY,
                },
            }
        }
    }
}

export { ChestFormData }
