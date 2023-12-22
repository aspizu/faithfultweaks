import { useSignal } from "@preact/signals"
import { useRef } from "preact/hooks"
import cls from "../cls"

export interface ImageGalleryProps {
    class?: string
    images: string[]
}

export default function ImageGallery({
    class: className,
    images,
}: ImageGalleryProps) {
    const imagesContainer = useRef<HTMLDivElement | null>(null)
    const activeIndex = useSignal(0)
    if (activeIndex.value >= images.length) {
        activeIndex.value = images.length - 1
        focus()
    }
    function focus() {
        if (imagesContainer.current) {
            imagesContainer.current.scrollTo({
                behavior: "smooth",
                left: imagesContainer.current.clientWidth * activeIndex.value,
            })
        }
    }
    return (
        <div class={cls("ImageGallery", className)}>
            <div ref={imagesContainer} class="ImageGallery__images">
                {images.map((image) => (
                    <img class="ImageGallery__img" key={image} src={image} />
                ))}
            </div>
            <div class="ImageGallery__buttons">
                <button
                    class="ImageGallery__button ImageGallery__prev"
                    disabled={activeIndex.value === 0}
                    onClick={() => {
                        if (activeIndex.value > 0) {
                            activeIndex.value -= 1
                        }
                        focus()
                    }}
                >
                    navigate_before
                </button>
                <button
                    class="ImageGallery__button ImageGallery__next"
                    disabled={activeIndex.value === images.length - 1}
                    onClick={() => {
                        if (activeIndex.value < images.length - 1) {
                            activeIndex.value += 1
                        }
                        focus()
                    }}
                >
                    navigate_next
                </button>
            </div>
        </div>
    )
}
