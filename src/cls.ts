import { iter } from "./itertools"

export default function cls(
    ...classNames: ({ toString(): string } | undefined | null | false)[]
) {
    return iter(classNames)
        .filterTrue()
        .map((item) => item.toString())
        .intersperse(" ")
        .join()
}
