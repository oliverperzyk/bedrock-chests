import type { IAppRouteReferenceItemOptions } from "@/oliverperzyk/libs/models/app/documentation/reference/item-page/interfaces/IAppRouteReferenceItemOptions"
import type { Metadata } from "next"
import type { JSX } from "react"
import { notFound } from "next/navigation"

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

async function ReferenceItemPage({ params }: Readonly<IAppRouteReferenceItemOptions>): Promise<JSX.Element | never> {
    const { itemName } = await params
    if (!itemName) return notFound()

    return <></>
}

export { generateMetadata }
export default ReferenceItemPage
