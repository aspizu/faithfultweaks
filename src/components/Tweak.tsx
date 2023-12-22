import { packVariant, tweaks } from "../App"
import * as types from "../types/Data"
import ImageGallery from "./ImageGallery"
import Toggle from "./Toggle"

export default function Tweak({
    name,
    tweak,
}: {
    name: string
    tweak: types.Tweak
}) {
    const supported = packVariant.value === "x32" || tweak.x64support
    return (
        <div class="Tweak card column p4 g4">
            <div class="row g2 vcenter">
                <div class="column">
                    <span class="lg bold">{tweak.data.title}</span>
                    <span class="sm subtext">{tweak.data.description}</span>
                </div>
                <div class="flex-fill"></div>
                <Toggle
                    value={tweaks.value.has(name)}
                    disabled={!supported}
                    onChange={() => {
                        const v = new Set(tweaks.value)
                        if (tweaks.value.has(name)) {
                            v.delete(name)
                        } else {
                            v.add(name)
                        }
                        tweaks.value = v
                    }}
                />
            </div>
            {packVariant.value === "x64" && !tweak.x64support && (
                <div class="row vcenter hcenter">
                    <div class="Tweak__notSupported">
                        <span class="material-symbols-outlined color-warning">
                            error
                        </span>
                        Not supported for x64 yet.
                    </div>
                </div>
            )}
            {supported &&
                (tweak.previewFiles.length > 0 ? (
                    <ImageGallery
                        class="Tweak__gallery"
                        images={tweak.previewFiles.map(
                            (image) =>
                                `tweaks/${name}/${packVariant.value}/preview/${image}`
                        )}
                    />
                ) : (
                    <div class="row vcenter hcenter">
                        <div class="Tweak__notSupported">
                            <span class="material-symbols-outlined color-warning">
                                broken_image
                            </span>
                            No preview screenshots.
                        </div>
                    </div>
                ))}
            <div class="row g2">
                {tweak.data.author.discord && (
                    <span class="Tweak__mark Tweak__mark--discord">
                        <img
                            src="assets/discord-mark-white.svg"
                            width="14rem"
                        ></img>{" "}
                        @{tweak.data.author.discord}
                    </span>
                )}
                {tweak.data.author.github && (
                    <a
                        href={`https://github.com/${tweak.data.author.github}`}
                        class="row"
                    >
                        <span class="Tweak__mark Tweak__mark--github">
                            <img
                                src="assets/github-mark-white.svg"
                                width="14rem"
                            ></img>{" "}
                            @{tweak.data.author.github}
                        </span>
                    </a>
                )}
                {tweak.data.author.link && (
                    <a href={tweak.data.author.link} class="row">
                        <span class="Tweak__mark">
                            <span class="material-symbols-outlined">link</span>
                            {tweak.data.author.link}
                        </span>
                    </a>
                )}
                {tweak.data.author.email && (
                    <span class="Tweak__mark">{tweak.data.author.email}</span>
                )}
            </div>
        </div>
    )
}
