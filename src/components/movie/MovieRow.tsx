"use client"

import { useRef } from "react"
import { Spinner } from "../ui/spinner"

const MovieRow = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0)
    scrollLeft.current = scrollRef.current?.scrollLeft || 0
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing'
    }
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX.current) * 2
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk
    }
  }

  return (
    <div className="relative w-full lg:max-w-[calc(100vw-320px)] max-w-[calc(100vw-60px)]">
      {/* Desvanecido al final */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-60 pointer-events-none z-10">
        <div
          className="w-full h-[350px] backdrop-blur-sm"
          style={{
            maskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)'
          }}
        />
      </div>

      {/* Contenedor de scroll */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="overflow-x-auto overflow-y-hidden pb-4 cursor-grab active:cursor-grabbing select-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
        <div className="flex gap-4 w-max">
          {children}
          <div className="aspect-[9/16] h-[250px] sm:h-[280px] lg:h-[350px] bg-transparent flex items-center justify-center">
            <Spinner className="size-[3rem] text-white" />
          </div>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default MovieRow;