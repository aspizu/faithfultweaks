import cls from "../cls"

export interface CheckboxProps {
    value: boolean
    onChange: () => void
}

export default function Checkbox({ value, onChange }: CheckboxProps) {
    return (
        <div
            class={cls("Checkbox", value && "active")}
            onClick={onChange}
        ></div>
    )
}
