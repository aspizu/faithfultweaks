export default function Toggle({
    value = false,
    onChange,
    disabled = false,
}: {
    value?: boolean
    onChange?: () => void
    disabled?: boolean
}) {
    return (
        <div
            class={`Toggle Toggle--disabled-${disabled}`}
            onClick={() => {
                if (onChange && !disabled) onChange()
            }}
        >
            <div class={value ? "active" : ""}></div>
        </div>
    )
}
