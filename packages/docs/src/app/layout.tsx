import type { Metadata, Viewport } from "next"
import type { IChildren } from "../libs/models/components/general/interfaces/IChildren"
import type { JSX } from "react"
import { ThemeProvider } from "@wrksz/themes/next"
import { Geist } from "next/font/google"
// import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const metadata: Metadata = {}
const viewport: Viewport = {}

function RootLayout({ children }: Readonly<IChildren>): JSX.Element {
    return (
        <html lang="en-US" className={`${geistSans.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    )
}

export { metadata, viewport }
export default RootLayout
