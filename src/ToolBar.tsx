import { PackVariant, packVariant } from "./App"
import Radio from "./components/Radio"
import { createPackage } from "./packager"

export default function ToolBar() {
    return (
        <div class="row g4 vcenter">
            <img src="assets/title.png" width="100rem" />

            <div class="flex-fill"></div>
            <div class="row g4">
                <div class="row vcenter g2">
                    <Radio
                        active={packVariant.value === PackVariant.x32}
                        onChange={() => {
                            packVariant.value = PackVariant.x32
                        }}
                    />
                    <span>x32</span>
                </div>
                <div class="row vcenter g2">
                    <Radio
                        active={packVariant.value === PackVariant.x64}
                        onChange={() => {
                            packVariant.value = PackVariant.x64
                        }}
                    />
                    <span>x64</span>
                </div>
            </div>
            <button class="button-primary" onClick={createPackage}>
                <span class="material-symbols-outlined lg">download</span>
                Download
            </button>
        </div>
    )
}
