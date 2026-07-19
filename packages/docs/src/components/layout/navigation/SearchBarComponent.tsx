"use client"
import { InputEvent, JSX, useState } from "react"

const SearchBarComponent = (): JSX.Element => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const [searchValue, setSearchedValue] = useState<string | null>(null)
    const updateSearch = (e: InputEvent<HTMLInputElement>): void => {
        setSearchedValue((e.target as HTMLInputElement).value)
        console.log(searchValue)
    }

    const toggleIsActive = (): void => {
        console.log("test")
        setIsActive((currentValue: boolean) => !currentValue)
    }

    return (
        <>
            <section
                className="p-2 bg-(--color-background) border-(--color-background-border) border-2 flex items-center justify-between gap-x-24 cursor-pointer"
                onClick={toggleIsActive}
            >
                <p className="text-(--color-font-secondary) text-sm">Search...</p>

                <div className="flex items-center justify-end gap-1">
                    <span className="text-(--color-font-secondary) text-sm p-0.5 px-1 bg-(--color-background-accent) font-minecraft-five">
                        Cmd
                    </span>
                    <span className="text-(--color-font-secondary) text-sm p-0.5 px-1 bg-(--color-background-accent) font-minecraft-five">
                        K
                    </span>
                </div>
            </section>
            <section
                className={`w-dvw h-dvh inset-0 fixed transition-all duration-150 bg-black/50 ${isActive ? "z-100 left-0" : "z-[-100] left-full"}`}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-full h-full" onClick={toggleIsActive}></div>
                    <div className="absolute max-w-48 max-md:max-w-(100% - 2em) px-4 py-4 bg-(--color-background-accent)">
                        <div className="flex items-center justify-start gap-x-2">
                            <input
                                type="text"
                                className="text-(--color-font-secondary) text-sm"
                                onInput={updateSearch}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SearchBarComponent
