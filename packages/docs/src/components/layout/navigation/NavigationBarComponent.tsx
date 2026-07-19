import type { JSX } from "react"
import Link from "next/link"
import SearchBarComponent from "./SearchBarComponent"

/**
 * @summary Navigation bar of the website.
 * @description An element of global layout, that is in demand for easy navigation.
 * @returns Content of a navigation bar.
 */
const NavigationBarComponent = (): JSX.Element => {
    return (
        <nav className="px-8 lg:px-[14%] h-20 flex justify-between items-center bg-(--color-background-accent) w-full sticky">
            <section className="flex items-center justify-start gap-x-4">
                <Link href="/" className="font-minecraft-five mr-8">
                    CHEST UI
                </Link>
                <Link
                    href="/installation"
                    className="font-minecraft-five text-(--color-font-secondary) duration-150 transition-colors hover:text-(--color-foreground)"
                >
                    INSTALLATION
                </Link>
            </section>
            <section className="flex justify-end gap-4 items-center">
                <SearchBarComponent />
            </section>
        </nav>
    )
}

export default NavigationBarComponent
