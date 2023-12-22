import { Signal } from "@preact/signals"

export interface SearchboxProps {
    value: Signal<string>
}

export default function Searchbox({ value }: SearchboxProps) {
    return (
        <div class="input">
            <input
                type="text"
                placeholder="Search"
                value={value}
                onInput={(ev) => {
                    value.value = (ev.target as HTMLInputElement).value
                }}
            />
            {value.value !== "" && (
                <button
                    class="material-symbols-outlined lg input-button"
                    onClick={() => {
                        value.value = ""
                    }}
                >
                    close
                </button>
            )}
            <span class="material-symbols-outlined lg">search</span>
        </div>
    )
}
