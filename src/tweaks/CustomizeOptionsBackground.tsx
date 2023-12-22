import { useSignal } from "@preact/signals"
import { customOptionsBackground, data, packVariant } from "../App"
import Checkbox from "../components/Checkbox"
import Searchbox from "../components/Searchbox"
import Toggle from "../components/Toggle"
import { iter } from "../itertools"

export default function CustomizeOptionsBackground() {
    const search = useSignal("")
    return (
        <div class="CustomizeOptionsBackground card column p4 g4">
            <div class="row g2 vcenter">
                <div class="column">
                    <span class="lg bold">Customize options background</span>
                    <span class="sm subtext">
                        {customOptionsBackground.value === null
                            ? "Default options background selected"
                            : "Custom options background selected"}
                    </span>
                </div>
                <div class="flex-fill"></div>
                <Toggle
                    value={customOptionsBackground.value !== null}
                    onChange={() => {
                        if (customOptionsBackground.value === null) {
                            customOptionsBackground.value = {
                                darken: true,
                                texture: "dirt",
                            }
                        } else {
                            customOptionsBackground.value = null
                        }
                    }}
                />
            </div>
            <div class="row vcenter g2">
                <Checkbox
                    value={
                        customOptionsBackground.value === null ||
                        customOptionsBackground.value.darken
                    }
                    onChange={() => {
                        if (customOptionsBackground.value !== null) {
                            customOptionsBackground.value = {
                                darken: !customOptionsBackground.value.darken,
                                texture: customOptionsBackground.value.texture,
                            }
                        } else {
                            customOptionsBackground.value = {
                                darken: false,
                                texture: "dirt",
                            }
                        }
                    }}
                />
                <span>Darken</span>
            </div>
            <Searchbox value={search} />
            <div
                class="row flex-wrap g1"
                style={{
                    maxHeight: "15rem",
                    overflow: "scroll",
                }}
            >
                {iter(data.value.customOptionsBackgrounds || [])
                    .filter((texture) =>
                        texture
                            .toLowerCase()
                            .startsWith(search.value.toLowerCase().trim())
                    )
                    .map((texture) => (
                        <div
                            key={texture}
                            class={`texture-swatch ${
                                customOptionsBackground.value?.texture ===
                                texture
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => {
                                customOptionsBackground.value = {
                                    darken:
                                        customOptionsBackground.value?.darken ||
                                        true,
                                    texture: texture,
                                }
                            }}
                        >
                            <img
                                src={`${packVariant.value}/assets/minecraft/textures/block/${texture}.png`}
                            />
                        </div>
                    ))
                    .collect()}
            </div>
        </div>
    )
}
