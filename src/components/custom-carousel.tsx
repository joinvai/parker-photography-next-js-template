"use client"

import type React from "react"

import { useState, useEffect, useMemo, useCallback } from "react"
import { cn } from "@/lib/utils"

interface CarouselItem {
  id: number
  color: string
}

interface CustomCarouselProps {
  className?: string
}

// Define items outside the component to prevent recreation on each render
const carouselItems: CarouselItem[] = [
  { id: 1, color: "bg-rose-400" },
  { id: 2, color: "bg-emerald-400" },
  { id: 3, color: "bg-amber-400" },
  { id: 4, color: "bg-sky-400" },
  { id: 5, color: "bg-purple-400" },
]

export function CustomCarousel({ className }: CustomCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState<CarouselItem[]>([])

  // Mouse position tracking
  const [mousePosition, setMousePosition] = useState<{ [key: number]: { x: number; y: number } }>({})
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  // Calculate how many items to show based on viewport
  const [itemsPerView, setItemsPerView] = useState(3)

  // Memoize the items array to prevent recreation on each render
  const items = useMemo(() => carouselItems, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Use useCallback to memoize the navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }, [items.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }, [items.length])

  // Update visible items when currentIndex or itemsPerView changes
  useEffect(() => {
    const visibleBoxes = []
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % items.length
      visibleBoxes.push(items[index])
    }
    setVisibleItems(visibleBoxes)
  }, [currentIndex, itemsPerView, items])

  // Memoize the mouse handlers to prevent recreation on each render
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition((prev) => ({
      ...prev,
      [idx]: { x, y },
    }))
  }, [])

  const handleMouseEnter = useCallback((idx: number) => {
    setHoveredItem(idx)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null)
  }, [])

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="flex justify-center">
        <div className="flex gap-4 w-full max-w-4xl">
          {visibleItems.map((item, idx) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
              key={`${item.id}-${idx}`}
              className={cn(
                "relative overflow-hidden rounded-lg transition-all duration-300",
                "w-full h-64 sm:h-80 md:h-96",
                item.color,
                hoveredItem === idx && (idx === 0 || idx === itemsPerView - 1) && "cursor-none",
              )}
              onClick={() => (idx === 0 ? goToPrevious() : idx === itemsPerView - 1 ? goToNext() : null)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Box number indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">{item.id}</span>
              </div>

              {/* Navigation text that follows mouse */}
              {hoveredItem === idx && (idx === 0 || idx === itemsPerView - 1) && mousePosition[idx] && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${mousePosition[idx].x}px`,
                    top: `${mousePosition[idx].y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="text-white text-2xl font-medium drop-shadow-lg">
                    {idx === 0 ? "Previous" : "Next"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile navigation (only visible on small screens) */}
      <div className="flex justify-between mt-4 sm:hidden">
        <button type="button" onClick={goToPrevious} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
          Previous
        </button>
        <button type="button" onClick={goToNext} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
          Next
        </button>
      </div>
    </div>
  )
}

