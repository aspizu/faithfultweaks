import preact from "@preact/preset-vite"
import { defineConfig } from "vite"
import civet from "@danielx/civet/vite"

export default defineConfig({
    plugins: [
        preact(),
        civet({
            implicitExtension: false,
            typecheck: true,
            ts: "preserve",
        }),
    ],
})
