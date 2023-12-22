import { useSignal } from "@preact/signals"
import {
    customOptionsBackground,
    customSlimeColor,
    data,
    isTweaksSelected,
    tweaks,
} from "./App"
import { OptionTransition } from "./components/ViewTransition"

function removeAllTweaks() {
    customOptionsBackground.value = null
    customSlimeColor.value = null
    tweaks.value = new Set()
}

export default function SideBar() {
    const removeAllModal = useSignal(false)
    return (
        <div class="column g4">
            <span class="subtext sm">
                {isTweaksSelected.value
                    ? "Selected tweaks"
                    : "Selected tweaks will appear here"}
            </span>
            <OptionTransition
                inClass="flip-front-down-in"
                outClass="scale-down-out"
            >
                {customOptionsBackground.value !== null && (
                    <div class="card row p2 g2">
                        <div class="column">
                            Customize options background
                            <span class="sm subtext">
                                ({customOptionsBackground.value.texture})
                            </span>
                        </div>
                        <div class="flex-fill"></div>
                        <div class="row vcenter">
                            <button
                                class="input-button"
                                onClick={() => {
                                    customOptionsBackground.value = null
                                }}
                            >
                                <span class="material-symbols-outlined lg">
                                    close
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </OptionTransition>
            <OptionTransition
                inClass="flip-front-down-in"
                outClass="scale-down-out"
            >
                {customSlimeColor.value && (
                    <div class="card row p2 g2">
                        <div class="column">
                            Customize Slime
                            <span class="sm subtext">
                                ({customSlimeColor.value.color})
                            </span>
                        </div>
                        <div class="flex-fill"></div>
                        <div class="row vcenter">
                            <button
                                class="input-button"
                                onClick={() => {
                                    customSlimeColor.value = null
                                }}
                            >
                                <span class="material-symbols-outlined lg">
                                    close
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </OptionTransition>
            {Object.entries(data.value.tweaks).map(([name, tweak]) => (
                <OptionTransition
                    inClass="flip-front-down-in"
                    outClass="scale-down-out"
                >
                    {tweaks.value.has(name) && (
                        <div class="card row p2 g2">
                            <span>{tweak.data.title}</span>
                            <div class="flex-fill"></div>
                            <div class="row vcenter">
                                <button
                                    class="input-button"
                                    onClick={() => {
                                        const v = new Set(tweaks.value)
                                        v.delete(name)
                                        tweaks.value = v
                                    }}
                                >
                                    <span class="material-symbols-outlined lg">
                                        close
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </OptionTransition>
            ))}
            <OptionTransition
                inClass="flip-front-down-in"
                outClass="scale-down-out"
            >
                {isTweaksSelected.value && (
                    <button
                        class="button vexpand"
                        onClick={() => {
                            removeAllModal.value = true
                        }}
                    >
                        <span class="material-symbols-outlined">delete</span>
                        Remove All
                    </button>
                )}
            </OptionTransition>
            <OptionTransition inClass="fade-in" outClass="fade-out">
                {removeAllModal.value && (
                    <div class="ModalWrapper">
                        <OptionTransition
                            inClass="scale-down-in"
                            outClass="scale-up-out"
                        >
                            {removeAllModal.value && (
                                <div class="Modal column p4 g4">
                                    <div class="row vcenter hcenter g4">
                                        <span class="lg">
                                            Do you want to remove all selected
                                            tweaks?
                                        </span>
                                        <span class="material-symbols-outlined xl color-warning">
                                            warning
                                        </span>
                                    </div>
                                    <div class="row g4">
                                        <button
                                            class="button-primary"
                                            onClick={() => {
                                                removeAllTweaks()
                                                removeAllModal.value = false
                                            }}
                                        >
                                            Remove All
                                        </button>
                                        <button
                                            class="button"
                                            onClick={() => {
                                                removeAllModal.value = false
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </OptionTransition>
                    </div>
                )}
            </OptionTransition>
        </div>
    )
}
