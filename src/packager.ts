import * as zip from "@zip.js/zip.js"
import { saveAs } from "file-saver"
import {
    customOptionsBackground,
    customSlimeColor,
    data,
    packVariant,
    tweaks,
} from "./App"

function asyncImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}

async function applyFilterToImage(src: string, filter: string) {
    const image = await asyncImage(src)
    const canvas = new OffscreenCanvas(image.width, image.height)
    const context = canvas.getContext("2d")!
    context.filter = filter
    context.drawImage(image, 0, 0)
    return await canvas.convertToBlob()
}

export async function createPackage() {
    const zipFileWriter = new zip.BlobWriter()
    const zipWriter = new zip.ZipWriter(zipFileWriter)
    for (const name of tweaks.value) {
        const tweak = data.value.tweaks[name]
        for (const file of tweak.files) {
            const fileBlob = await (
                await fetch(`/tweaks/${name}/${packVariant}/assets/${file}`)
            ).blob()
            const fileReader = new zip.BlobReader(fileBlob)
            await zipWriter.add(`assets/${file}`, fileReader)
        }
    }
    if (customOptionsBackground.value) {
        const fileBlob = await (
            await fetch(
                `/${packVariant.value}/assets/minecraft/textures/block/${customOptionsBackground.value.texture}.png`
            )
        ).blob()
        const fileReader = new zip.BlobReader(fileBlob)
        await zipWriter.add(
            "assets/minecraft/textures/gui/options_background.png",
            fileReader
        )
    }
    if (customSlimeColor.value) {
        let hexColor: string = customSlimeColor.value.color
        for (const [texture, file] of [
            ["slime_block", "block"],
            ["slime_ball", "item"],
            ["slime", "entity/slime"],
        ]) {
            const fileBlob = await applyFilterToImage(
                `/${packVariant}/slime/${texture}.png`,
                "hue-rotate(45deg)"
            )
            const fileReader = new zip.BlobReader(fileBlob)
            await zipWriter.add(
                `assets/minecraft/textures/${file}/${texture}.png`,
                fileReader
            )
        }
    }
    await zipWriter.add(
        "pack.mcmeta",
        new zip.TextReader(
            JSON.stringify({
                pack: {
                    pack_format: 18,
                    description: "Faithful Tweaks",
                },
            })
        )
    )
    const zipFileBlob = await zipWriter.close()
    saveAs(zipFileBlob, "package.zip")
}
