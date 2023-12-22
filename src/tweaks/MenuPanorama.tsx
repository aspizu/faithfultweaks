import Toggle from "../components/Toggle"

export default function MenuPanorama() {
    return (
        <div class="MenuPanorama card column p4 g4">
            <div class="row g2 vcenter">
                <div class="column">
                    <span class="lg bold">Customize Menu Panorama</span>
                    <span class="sm subtext">
                        Default menu panorama selected
                    </span>
                </div>
                <div class="flex-fill"></div>
                <Toggle value />
            </div>
        </div>
    )
}
