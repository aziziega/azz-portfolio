"use client"

import { useState, useEffect } from "react"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    if (selectedImage === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
      } else if (e.key === "ArrowRight") {
        setSelectedImage((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev))
      } else if (e.key === "Escape") {
        setSelectedImage(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImage, images.length])

  return (
    <>
      <div className="detail-gallery-grid">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="detail-gallery-item"
          >
            <img
              src={image}
              alt={`${title} - Image ${index + 1}`}
            />
            <div className="detail-gallery-overlay">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {selectedImage !== null && (
        <div className="detail-lightbox" onClick={() => setSelectedImage(null)}>
          <button className="detail-lightbox-close" onClick={() => setSelectedImage(null)}>
            &times;
          </button>
          <button
            className="detail-lightbox-nav detail-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(Math.max(0, selectedImage - 1))
            }}
            disabled={selectedImage === 0}
          >
            &lsaquo;
          </button>
          <button
            className="detail-lightbox-nav detail-lightbox-next"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(Math.min(images.length - 1, selectedImage + 1))
            }}
            disabled={selectedImage === images.length - 1}
          >
            &rsaquo;
          </button>
          <img
            src={images[selectedImage]}
            alt={`${title} - Image ${selectedImage + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="detail-lightbox-counter">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
