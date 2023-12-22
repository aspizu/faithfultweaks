export default function Radio({
    active = false,
    onChange,
}: {
    active?: boolean
    onChange?: () => void
}) {
    return (
        <div class="Radio" onClick={onChange}>
            <div class={active ? "active" : ""}></div>
        </div>
    )
}
