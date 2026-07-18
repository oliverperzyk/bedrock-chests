import type { IChildren } from "@/oliverperzyk/libs/models/components/general/interfaces/IChildren"
import type { JSX } from "react"

/**
 * @summary Layout that adds a special sidebar in reference pages.
 * @param children - Content of subsites.
 * @returns Content of subsite with special sidebar.
 */
function DocumentationLayout({ children }: Readonly<IChildren>): JSX.Element {
    return (
        <>
            <aside></aside>
            <main>{children}</main>
        </>
    )
}

export default DocumentationLayout
