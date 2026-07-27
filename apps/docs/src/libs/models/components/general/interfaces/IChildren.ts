import type { ReactNode } from "react"

/**
 * @summary A base interface for components.
 * @description This base interface is used to define the children property for components.
 */
interface IChildren {
    /**
     * @summary The children of the component.
     * @description The children of the component.
     */
    readonly children: ReactNode
}

export type { IChildren }
