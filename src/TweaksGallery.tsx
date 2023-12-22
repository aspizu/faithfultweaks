import { useSignal } from "@preact/signals"
import { data } from "./App"
import Searchbox from "./components/Searchbox"
import Tweak from "./components/Tweak"
import CustomizeOptionsBackground from "./tweaks/CustomizeOptionsBackground"
import CustomizeSlime from "./tweaks/CustomizeSlime"
import MenuPanorama from "./tweaks/MenuPanorama"

export default function TweaksGallery() {
    const search = useSignal("")
    return (
        <div class="column g4">
            <Searchbox value={search} />
            <div
                class="grid g4"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(min(25rem, 100%), 1fr))",
                }}
            >
                <CustomizeOptionsBackground />
                <CustomizeSlime />
                <MenuPanorama />
                {Object.entries(data.value.tweaks).map(([name, tweak]) => (
                    <Tweak key={name} name={name} tweak={tweak} />
                ))}
            </div>
        </div>
    )
}
