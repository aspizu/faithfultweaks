import { Signal, computed, signal } from "@preact/signals"

import "./App.scss"
import SideBar from "./SideBar"
import ToolBar from "./ToolBar"
import TweaksGallery from "./TweaksGallery"
import "./animations.scss"
import { Data } from "./types/Data"

export enum PackVariant {
    x32 = "x32",
    x64 = "x64",
}

const $data = signal<Data | null>(null)
export const data = $data as Signal<Data>
fetch("data.json").then(async (v) => {
    data.value = await v.json()
})
export const packVariant = signal(PackVariant.x32)
export const customOptionsBackground = signal<{
    darken: boolean
    texture: string
} | null>(null)
export const customSlimeColor = signal<{
    isCustom: boolean
    color: string
} | null>(null)
export const tweaks = signal<Set<string>>(new Set())
export const isTweaksSelected = computed(
    () =>
        customOptionsBackground.value !== null ||
        customSlimeColor.value !== null ||
        tweaks.value.size !== 0
)

export default function App() {
    return !$data.value ? (
        <div>Loading...</div>
    ) : (
        <div class="column p4 g4 flip-front-down-in">
            <ToolBar />
            <div
                class="grid g4"
                style={{
                    gridTemplateColumns: "20rem 1fr",
                }}
            >
                <SideBar />
                <TweaksGallery />
            </div>
        </div>
    )
}
