import { useRef } from "preact/hooks"
import { customSlimeColor } from "../App"
import cls from "../cls"
import Checkbox from "../components/Checkbox"
import Toggle from "../components/Toggle"

const colors = [
    "#FF6347", // Tomato
    "#4682B4", // Steel Blue
    "#FFA500", // Orange
    "#8A2BE2", // Blue Violet
    "#32CD32", // Lime Green
    "#FF69B4", // Hot Pink
    "#1E90FF", // Dodger Blue
    "#FFD700", // Gold
    "#00FF7F", // Spring Green
    "#9932CC", // Dark Orchid
    "#FF4500", // Orange Red
    "#20B2AA", // Light Sea Green
    "#BA55D3", // Medium Orchid
    "#00CED1", // Dark Turquoise
    "#F08080", // Light Coral
    "#6A5ACD", // Slate Blue
    "#3CB371", // Medium Sea Green
    "#7B68EE", // Medium Slate Blue
    "#FA8072", // Salmon
    "#00FA9A", // Medium Spring Green
] as const

export default function CustomizeSlime() {
    const customColorInput = useRef<HTMLInputElement | null>(null)
    return (
        <div class="CustomizeSlime card column p4 g4">
            <div class="row g2 vcenter">
                <div class="column">
                    <span class="lg bold">Customize Slime</span>
                    <span class="sm subtext">
                        {customSlimeColor.value !== null
                            ? "Custom slime color selected"
                            : "No customization selected"}
                    </span>
                </div>
                <div class="flex-fill"></div>
                <Toggle
                    value={customSlimeColor.value !== null}
                    onChange={() => {
                        if (customSlimeColor.value) {
                            customSlimeColor.value = null
                        } else {
                            if (!customColorInput.current) {
                                return
                            }
                            customSlimeColor.value = {
                                isCustom: true,
                                color: customColorInput.current.value,
                            }
                            customColorInput.current.scrollIntoView()
                            customColorInput.current.click()
                        }
                    }}
                />
            </div>
            <div class="row vcenter g2">
                <Checkbox value onChange={() => {}} />
                <span>Remove transparency</span>
            </div>
            <div
                class="grid g1"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, 3rem)",
                }}
            >
                <div
                    class={cls(
                        "color-input-swatch",
                        customSlimeColor.value?.isCustom && "active"
                    )}
                    style={{
                        backgroundColor: customColorInput.current?.value,
                    }}
                    onClick={() => {
                        customColorInput.current?.click()
                    }}
                >
                    <input
                        ref={customColorInput}
                        type="color"
                        onInput={(ev) => {
                            customSlimeColor.value = {
                                isCustom: true,
                                color: (ev.target as HTMLInputElement).value,
                            }
                        }}
                        onClick={(ev) => {
                            customSlimeColor.value = {
                                isCustom: true,
                                color: (ev.target as HTMLInputElement).value,
                            }
                        }}
                    />
                </div>

                {colors.map((color) => (
                    <div
                        key={color}
                        class={cls(
                            "color-swatch",
                            customSlimeColor.value &&
                                !customSlimeColor.value.isCustom &&
                                customSlimeColor.value.color === color &&
                                "active"
                        )}
                        style={{
                            backgroundColor: color,
                        }}
                        onClick={() => {
                            customSlimeColor.value = {
                                isCustom: false,
                                color: color,
                            }
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}
