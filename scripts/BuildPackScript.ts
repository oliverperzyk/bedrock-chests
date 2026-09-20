import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, type Stats } from "node:fs"
import { join, relative, sep } from "node:path"
import { crc32, deflateRawSync } from "node:zlib"

/**
 * @summary Class that represents a pack build script.
 * @description Copies pack files, minifies JSON, and writes a `.mcpack` archive into `dist`.
 */
class BuildPackScript {
    /**
     * @summary Pack entries that are copied into the archive.
     * @description File and directory names from the package root that are included in the resource pack.
     */
    private static readonly PACK_ENTRIES: readonly string[] = ["manifest.json", "texts", "textures", "ui"]
    /**
     * @summary Dist directory name.
     * @description Name of the directory where the built pack is written.
     */
    private static readonly DIST_DIRECTORY_NAME: string = "dist"
    /**
     * @summary Pack file name.
     * @description File name of the built `.mcpack` archive.
     */
    private static readonly PACK_FILE_NAME: string = "bedrock-chests.mcpack"
    /**
     * @summary JSON file extension.
     * @description Extension used to detect JSON files that should be minified.
     */
    private static readonly JSON_FILE_EXTENSION: string = ".json"
    /**
     * @summary ZIP local file header signature.
     * @description Signature written at the start of each local file header.
     */
    private static readonly ZIP_LOCAL_FILE_HEADER_SIGNATURE: number = 0x04034b50
    /**
     * @summary ZIP central directory header signature.
     * @description Signature written at the start of each central directory header.
     */
    private static readonly ZIP_CENTRAL_DIRECTORY_HEADER_SIGNATURE: number = 0x02014b50
    /**
     * @summary ZIP end of central directory signature.
     * @description Signature written at the start of the end of central directory record.
     */
    private static readonly ZIP_END_OF_CENTRAL_DIRECTORY_SIGNATURE: number = 0x06054b50
    /**
     * @summary ZIP format version.
     * @description Version needed to extract a deflated ZIP entry.
     */
    private static readonly ZIP_FORMAT_VERSION: number = 20
    /**
     * @summary ZIP UTF-8 language encoding flag.
     * @description General purpose bit that marks entry names as UTF-8.
     */
    private static readonly ZIP_UTF8_FLAG: number = 0x0800
    /**
     * @summary ZIP deflate compression method.
     * @description Compression method identifier for deflated ZIP entries.
     */
    private static readonly ZIP_DEFLATE_COMPRESSION_METHOD: number = 8
    /**
     * @summary Package root directory.
     * @description Absolute path to the resource pack package root.
     */
    private static readonly ROOT_DIRECTORY: string = join(import.meta.dirname, "..")

    /**
     * @summary Private constructor.
     * @description Private constructor is to prevent instantiation and inheritance.
     */
    private constructor() {}

    /**
     * @summary Static initializer.
     * @description Static initializer is to initialize the pack build script.
     */
    static {
        this.build()
    }

    /**
     * @summary Builds the resource pack.
     * @description Collects pack files, minifies JSON, and writes a `.mcpack` archive into `dist`.
     */
    private static build(): void {
        const files: { path: string; data: Buffer }[] = this.collectPackFiles()
        if (files.length === 0) {
            throw new Error("No pack files were found to archive.")
        }

        const distDirectory: string = join(this.ROOT_DIRECTORY, this.DIST_DIRECTORY_NAME)
        rmSync(distDirectory, { recursive: true, force: true })
        mkdirSync(distDirectory, { recursive: true })

        const packFilePath: string = join(distDirectory, this.PACK_FILE_NAME)
        writeFileSync(packFilePath, this.createZipArchive(files))
        console.log(`Built resource pack: ${packFilePath}`)
    }

    /**
     * @summary Collects pack files.
     * @description Walks configured pack entries and returns files that should be archived.
     * @returns Files that should be archived, with ZIP paths relative to the package root.
     */
    private static collectPackFiles(): { path: string; data: Buffer }[] {
        const files: { path: string; data: Buffer }[] = []
        for (const entry of this.PACK_ENTRIES) {
            const absolutePath: string = join(this.ROOT_DIRECTORY, entry)
            if (!existsSync(absolutePath)) continue
            this.collectFilesFromPath(absolutePath, files)
        }

        return files
    }

    /**
     * @summary Collects files from a path.
     * @description Recursively collects files from a file or directory, minifying JSON contents.
     * @param absolutePath Absolute path to a file or directory.
     * @param files Array that collected files are pushed into.
     */
    private static collectFilesFromPath(absolutePath: string, files: { path: string; data: Buffer }[]): void {
        const stats: Stats = statSync(absolutePath)
        if (stats.isDirectory()) {
            const children: string[] = readdirSync(absolutePath)
            for (const child of children) {
                if (child.startsWith(".")) continue
                this.collectFilesFromPath(join(absolutePath, child), files)
            }
            return
        }

        if (!stats.isFile()) return

        const zipPath: string = relative(this.ROOT_DIRECTORY, absolutePath).split(sep).join("/")
        const fileData: Buffer = readFileSync(absolutePath)
        files.push({
            path: zipPath,
            data: zipPath.toLowerCase().endsWith(this.JSON_FILE_EXTENSION) ? this.minifyJson(fileData) : fileData,
        })
    }

    /**
     * @summary Minifies a JSON file.
     * @description Parses JSON and stringifies it without spaces between brackets and objects.
     * @param fileData Raw JSON file contents.
     * @returns Minified JSON contents, or the original data if parsing fails.
     */
    private static minifyJson(fileData: Buffer): Buffer {
        try {
            const parsedJson: unknown = JSON.parse(fileData.toString("utf8"))
            return Buffer.from(JSON.stringify(parsedJson), "utf8")
        } catch {
            return fileData
        }
    }

    /**
     * @summary Creates a ZIP archive.
     * @description Builds a ZIP buffer from collected files using deflate compression.
     * @param files Files to include in the archive.
     * @returns ZIP archive contents.
     */
    private static createZipArchive(files: { path: string; data: Buffer }[]): Buffer {
        const localChunks: Buffer[] = []
        const centralChunks: Buffer[] = []
        let offset: number = 0

        for (const file of files) {
            const fileName: Buffer = Buffer.from(file.path, "utf8")
            const uncompressedData: Buffer = file.data
            const compressedData: Buffer = deflateRawSync(uncompressedData)
            const checksum: number = crc32(uncompressedData) >>> 0

            const localHeader: Buffer = Buffer.alloc(30)
            localHeader.writeUInt32LE(this.ZIP_LOCAL_FILE_HEADER_SIGNATURE, 0)
            localHeader.writeUInt16LE(this.ZIP_FORMAT_VERSION, 4)
            localHeader.writeUInt16LE(this.ZIP_UTF8_FLAG, 6)
            localHeader.writeUInt16LE(this.ZIP_DEFLATE_COMPRESSION_METHOD, 8)
            localHeader.writeUInt16LE(0, 10)
            localHeader.writeUInt16LE(0, 12)
            localHeader.writeUInt32LE(checksum, 14)
            localHeader.writeUInt32LE(compressedData.length, 18)
            localHeader.writeUInt32LE(uncompressedData.length, 22)
            localHeader.writeUInt16LE(fileName.length, 26)
            localHeader.writeUInt16LE(0, 28)
            localChunks.push(localHeader, fileName, compressedData)

            const centralHeader: Buffer = Buffer.alloc(46)
            centralHeader.writeUInt32LE(this.ZIP_CENTRAL_DIRECTORY_HEADER_SIGNATURE, 0)
            centralHeader.writeUInt16LE(this.ZIP_FORMAT_VERSION, 4)
            centralHeader.writeUInt16LE(this.ZIP_FORMAT_VERSION, 6)
            centralHeader.writeUInt16LE(this.ZIP_UTF8_FLAG, 8)
            centralHeader.writeUInt16LE(this.ZIP_DEFLATE_COMPRESSION_METHOD, 10)
            centralHeader.writeUInt16LE(0, 12)
            centralHeader.writeUInt16LE(0, 14)
            centralHeader.writeUInt32LE(checksum, 16)
            centralHeader.writeUInt32LE(compressedData.length, 20)
            centralHeader.writeUInt32LE(uncompressedData.length, 24)
            centralHeader.writeUInt16LE(fileName.length, 28)
            centralHeader.writeUInt16LE(0, 30)
            centralHeader.writeUInt16LE(0, 32)
            centralHeader.writeUInt16LE(0, 34)
            centralHeader.writeUInt16LE(0, 36)
            centralHeader.writeUInt32LE(0, 38)
            centralHeader.writeUInt32LE(offset, 42)
            centralChunks.push(centralHeader, fileName)

            offset += localHeader.length + fileName.length + compressedData.length
        }

        const centralDirectorySize: number = centralChunks.reduce(
            (size: number, chunk: Buffer): number => size + chunk.length,
            0,
        )
        const endOfCentralDirectory: Buffer = Buffer.alloc(22)
        endOfCentralDirectory.writeUInt32LE(this.ZIP_END_OF_CENTRAL_DIRECTORY_SIGNATURE, 0)
        endOfCentralDirectory.writeUInt16LE(0, 4)
        endOfCentralDirectory.writeUInt16LE(0, 6)
        endOfCentralDirectory.writeUInt16LE(files.length, 8)
        endOfCentralDirectory.writeUInt16LE(files.length, 10)
        endOfCentralDirectory.writeUInt32LE(centralDirectorySize, 12)
        endOfCentralDirectory.writeUInt32LE(offset, 16)
        endOfCentralDirectory.writeUInt16LE(0, 20)

        return Buffer.concat([...localChunks, ...centralChunks, endOfCentralDirectory])
    }
}

export { BuildPackScript }
