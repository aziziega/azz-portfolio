import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "AZIZI EGATRI MU'THI — Software Engineer & Product Builder"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Twitter/X uses same format as OG — reuse the same design
export { default } from "./opengraph-image"
