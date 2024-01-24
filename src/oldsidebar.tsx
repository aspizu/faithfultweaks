import { useSignal } from "@preact/signals"
import Box from "bloom/components/Box"
import Button from "bloom/components/Button"
import Flexpander from "bloom/components/Flexpander"
import Icon from "bloom/components/Icon"
import IconButton from "bloom/components/IconButton"
import Text from "bloom/components/Text"
import {
    customOptionsBackground,
    customSlimeColor,
    data,
    isTweaksSelected,
    tweaks,
} from "./App"
import { OptionTransition } from "./components/ViewTransition"
import * as Data from "./types/Data"

function removeAllTweaks() {
    customOptionsBackground.value = null
    customSlimeColor.value = null
    tweaks.value = new Set()
}

function SelectedTweak({
    text,
    subtext,
    onRemove,
}: {
    text: string
    subtext?: string
    onRemove: () => void
}) {
    return (
        <Box surface="card" padding={2} gap={2}>
            <Box column>
                {text}
                {subtext && (
                    <Text size="sm" color="gray">
                        {subtext}
                    </Text>
                )}
            </Box>
            <Flexpander />
            <Box vcenter>
                <IconButton variant="overlay" size="sm" onClick={onRemove}>
                    close
                </IconButton>
            </Box>
        </Box>
    )
}

function CustomOptionsBackground({ texture }: { texture: string }) {
    return (
        <SelectedTweak
            text="Customize options background"
            subtext={`(${texture})`}
            onRemove={() => {
                customOptionsBackground.value = null
            }}
        />
    )
}

function CustomSlimeColor({ color }: { color: string }) {
    return (
        <SelectedTweak
            text="Customize slime color"
            subtext={`(${color})`}
            onRemove={() => {
                customSlimeColor.value = null
            }}
        />
    )
}

function Tweak({ name, tweak }: { name: string; tweak: Data.Tweak }) {
    return (
        <SelectedTweak
            text={tweak.data.title}
            onRemove={() => {
                const v = new Set(tweaks.value)
                v.delete(name)
                tweaks.value = v
            }}
        />
    )
}

export default function SideBar() {
    const removeAllModal = useSignal(false)
    return (
        <Box column gap={4}>
            <Text size="sm" color="gray">
                {isTweaksSelected.value
                    ? "Selected tweaks"
                    : "Selected tweaks will appear here"}
            </Text>
            <OptionTransition
                inClass="flip-front-down-in"
                outClass="scale-down-out"
            >
                {customOptionsBackground.value !== null && (
                    <CustomOptionsBackground
                        texture={customOptionsBackground.value.texture}
                    />
                )}
            </OptionTransition>
            <OptionTransition
                inClass="flip-front-down-in"
                outClass="scale-down-out"
            >
                {customSlimeColor.value && (
                    <CustomSlimeColor color={customSlimeColor.value.color} />
                )}
            </OptionTransition>
            {Object.entries(data.value.tweaks).map(([name, tweak]) => (
                <OptionTransition
                    inClass="flip-front-down-in"
                    outClass="scale-down-out"
                >
                    {tweaks.value.has(name) && (
                        <Tweak name={name} tweak={tweak} />
                    )}
                </OptionTransition>
            ))}
            <OptionTransition
                inClass="flip-front-down-in"
                outClass="scale-down-out"
            >
                {isTweaksSelected.value && (
                    <Button
                        iconLeft
                        onClick={() => {
                            removeAllModal.value = true
                        }}
                    >
                        <Icon>delete</Icon>
                        Remove All
                    </Button>
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
        </Box>
    )
}
