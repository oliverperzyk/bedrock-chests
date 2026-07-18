import type { FormCancelationReason } from "@minecraft/server-ui"
import type { ChestFormSelectedValueLocation } from "../enums/ChestFormSelectedValueLocation"

/**
 * @summary Type that represents a response of a chest form.
 * @description This type is used to represent a response of a chest form.
 */
type IChestFormResponse =
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
          readonly selectedValue: {
              readonly slot: number
              readonly location: ChestFormSelectedValueLocation
          }
      }

export type { IChestFormResponse }
