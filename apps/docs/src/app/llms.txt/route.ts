/**
 * @summary Content of the LLMs.txt file.
 * @description Provides information to AI agents scraping the website.
 */
const INFORMATION: string = `
`

/**
 * @summary Get the LLMs.txt file.
 * @description File provides information to AI agents scraping the website.
 * @returns The LLMs.txt file with information about the website for AI agents.
 */
export function GET(): Response {
    return new Response(INFORMATION, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    })
}
