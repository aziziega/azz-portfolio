"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ZoomIn, ZoomOut, RotateCcw, Check, X } from "lucide-react"

interface ImageCropModalProps {
  isOpen: boolean
  imageSrc: string
  onClose: () => void
  onCropComplete: (croppedBlob: Blob) => void
  isId?: boolean
}

export default function ImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  isId = true,
}: ImageCropModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null)
  const [cropping, setCropping] = useState(false)

  const CANVAS_SIZE = 300
  const CROP_RADIUS = 120 // 240px diameter circle

  // Load image when imageSrc changes
  useEffect(() => {
    if (!imageSrc) return
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageSrc
    img.onload = () => {
      setImageObj(img)
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [imageSrc])

  // Draw canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageObj) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Calculate image dimensions to fit within canvas initially
    const scale = Math.max(
      (CROP_RADIUS * 2) / imageObj.width,
      (CROP_RADIUS * 2) / imageObj.height
    ) * zoom

    const drawWidth = imageObj.width * scale
    const drawHeight = imageObj.height * scale

    const centerX = CANVAS_SIZE / 2 + position.x
    const centerY = CANVAS_SIZE / 2 + position.y

    // Draw the image
    ctx.drawImage(
      imageObj,
      centerX - drawWidth / 2,
      centerY - drawHeight / 2,
      drawWidth,
      drawHeight
    )

    // Draw dark overlay outside circular crop area
    ctx.save()
    ctx.fillStyle = "rgba(15, 23, 42, 0.65)"
    ctx.beginPath()
    ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CROP_RADIUS, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.restore()

    // Draw circular guideline border
    ctx.save()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CROP_RADIUS, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }, [imageObj, zoom, position])

  useEffect(() => {
    if (isOpen && imageObj) {
      draw()
    }
  }, [isOpen, imageObj, draw])

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || e.touches.length !== 1) return
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleReset = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleApplyCrop = async () => {
    if (!imageObj) return

    try {
      setCropping(true)

      // Create high resolution export canvas (400x400)
      const exportCanvas = document.createElement("canvas")
      const OUTPUT_SIZE = 400
      exportCanvas.width = OUTPUT_SIZE
      exportCanvas.height = OUTPUT_SIZE
      const ctx = exportCanvas.getContext("2d")
      if (!ctx) throw new Error("Could not get export canvas context")

      // Scale factor from preview canvas (CANVAS_SIZE) to export canvas
      const exportScaleFactor = OUTPUT_SIZE / (CROP_RADIUS * 2)

      const scale = Math.max(
        (CROP_RADIUS * 2) / imageObj.width,
        (CROP_RADIUS * 2) / imageObj.height
      ) * zoom * exportScaleFactor

      const drawWidth = imageObj.width * scale
      const drawHeight = imageObj.height * scale

      const exportCenterX = OUTPUT_SIZE / 2 + position.x * exportScaleFactor
      const exportCenterY = OUTPUT_SIZE / 2 + position.y * exportScaleFactor

      // Draw circular clip path
      ctx.beginPath()
      ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, 0, Math.PI * 2)
      ctx.clip()

      // Draw image
      ctx.drawImage(
        imageObj,
        exportCenterX - drawWidth / 2,
        exportCenterY - drawHeight / 2,
        drawWidth,
        drawHeight
      )

      exportCanvas.toBlob(
        (blob) => {
          if (blob) {
            onCropComplete(blob)
            onClose()
          }
          setCropping(false)
        },
        "image/jpeg",
        0.92
      )
    } catch (err) {
      console.error("Crop error:", err)
      setCropping(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal-card animate-fadeIn">
        {/* Header */}
        <div className="crop-modal-header">
          <div>
            <h3 className="crop-modal-title">
              {isId ? "Sesuaikan Foto Profil" : "Adjust Profile Photo"}
            </h3>
            <p className="crop-modal-sub">
              {isId
                ? "Geser foto dan atur perbesaran agar pas di dalam lingkaran."
                : "Drag photo and adjust zoom to fit nicely in the circle."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="crop-modal-close-btn"
            title="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Canvas Workspace */}
        <div className="crop-canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="crop-canvas"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          />
        </div>

        {/* Controls */}
        <div className="crop-controls">
          <div className="crop-slider-row">
            <ZoomOut size={16} className="text-gray-400" />
            <input
              type="range"
              min="1"
              max="3"
              step="0.02"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="crop-slider"
            />
            <ZoomIn size={16} className="text-gray-400" />
            <button
              type="button"
              onClick={handleReset}
              className="crop-reset-btn"
              title={isId ? "Reset Posisi" : "Reset Position"}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="crop-modal-actions">
          <button
            type="button"
            onClick={onClose}
            disabled={cropping}
            className="crop-btn-cancel"
          >
            {isId ? "Batal" : "Cancel"}
          </button>
          <button
            type="button"
            onClick={handleApplyCrop}
            disabled={cropping}
            className="crop-btn-apply"
          >
            <Check size={16} />
            <span>{cropping ? (isId ? "Menyimpan..." : "Saving...") : (isId ? "Terapkan & Upload" : "Apply & Upload")}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
