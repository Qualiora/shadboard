import type { MessageType } from "../../../../../types"

import { MediaGrid } from "@/components/media-grid"

export function ImagesMessageBubbleContent({
  images,
}: {
  images: MessageType["images"]
}) {
  if (!images || !images.length) return null // Return null if the images are empty

  const imagesData = images.map((image) => ({
    src: image.url,
    alt: image.name,
    type: "IMAGE" as const,
  }))

  return <MediaGrid data={imagesData} />
}
