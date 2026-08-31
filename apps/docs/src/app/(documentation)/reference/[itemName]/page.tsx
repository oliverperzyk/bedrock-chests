import type { IAppRouteReferenceItemOptions } from "@/oliverperzyk/libs/models/app/documentation/reference/item-page/interfaces/IAppRouteReferenceItemOptions"
import type { Metadata } from "next"
import type { JSX } from "react"
import { notFound } from "next/navigation"

/**
 * @summary Generates metadata for the reference item page.
 * @description This function is used to generate metadata for the reference item page.
 * @param params - The parameters of the page.
 * @returns Metadata for the reference item page.
 */
async function generateMetadata({ params }: Readonly<IAppRouteReferenceItemOptions>): Promise<Metadata> {
    const { itemName } = await params
    if (!itemName)
        return {
            title: "Not Found",
            description: "This item does not exist.",
        }

    return {
        title: itemName,
        description: `Documentation reference of ${itemName}.`,
    }
}

/**
 * @summary Renders the reference item page.
 * @description This function is used to render the reference item page.
 * @param params - The parameters of the page.
 * @returns The reference item page.
 */
async function ReferenceItemPage({ params }: Readonly<IAppRouteReferenceItemOptions>): Promise<JSX.Element | never> {
    const { itemName } = await params
    if (!itemName) return notFound()

    return <></>
}

export { generateMetadata }
export default ReferenceItemPage
