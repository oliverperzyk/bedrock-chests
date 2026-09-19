import { FormCancelationReason } from "@minecraft/server-ui"
import { CraftingTableFormSelectedValueLocation } from "../enums/CraftingTableFormSelectedValueLocation"

/**
 * @summary Type that represents a response of a crafting table form.
 * @description This type is used to represent a response of a crafting table form.
 */
type ICraftingTableFormResponse =
    | {
          /**
           * @summary Determines if the form was cancelled.
           * @description If it's set to true, the form was cancelled.
           */
          readonly canceled: true
          /**
           * @summary The reason why the form was cancelled.
           * @description This reason is used to determine the reason why the form was cancelled.
           * @remarks This field is only present if the form was cancelled.
           */
          readonly cancelationReason: FormCancelationReason
      }
    | {
          /**
           * @summary Determines if the form was not cancelled.
           * @description If it's set to true, the form was not cancelled.
           */
          readonly canceled: false
          /**
           * @summary The selected value of the form.
           * @description This value is used to determine the selected value of the form.
           * @remarks This field is only present if the form was not cancelled.
           */
          readonly selectedValue:
              | {
                    /**
                     * @summary The slot of the selected value.
                     * @description This slot is used to determine the slot of the selected value.
                     * @remarks This field is only present if the form was not cancelled and `location` is not `CraftingTableFormSelectedValueLocation.RESULT`.
                     */
                    readonly slot: number
                    /**
                     * @summary The location of the selected value.
                     * @description This location is used to determine the location of the selected value.
                     * @remarks This field is only present if the form was not cancelled.
                     */
                    readonly location:
                        CraftingTableFormSelectedValueLocation.RECIPE | CraftingTableFormSelectedValueLocation.INVENTORY
                }
              | {
                    /**
                     * @summary The location of the selected value.
                     * @description This location is used to determine the location of the selected value.`
                     */
                    readonly location: CraftingTableFormSelectedValueLocation.RESULT
                }
      }

export type { ICraftingTableFormResponse }
