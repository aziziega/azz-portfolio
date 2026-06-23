"use client"

import { useState } from "react"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <button
            className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(Math.max(0, selectedImage - 1))
            }}
            disabled={selectedImage === 0}
          >
            ‹
          </button>
          <button
            className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(Math.min(images.length - 1, selectedImage + 1))
            }}
            disabled={selectedImage === images.length - 1}
          >
            ›
          </button>
          <img
            src={images[selectedImage]}
            alt={`${title} - Image ${selectedImage + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
