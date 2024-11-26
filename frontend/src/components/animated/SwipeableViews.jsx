import { useEffect, useRef } from "react"

export function SwipeableViews(
  { className = "", index, onChangeIndex, ...rootProps }) {
  const containerRef = useRef(null)
  const scrollTimeout = useRef()

  useEffect(() => {
    containerRef.current?.children[index]?.scrollIntoView({ behavior: "smooth" })
  }, [index])

  return (
    <div
      {...rootProps}
      ref={containerRef}
      className={
        "flex snap-x snap-mandatory overflow-x-scroll " +
        "*:w-full *:flex-shrink-0 *:snap-center *:snap-always " + className
      }
      onScroll={({ currentTarget }) => {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
        scrollTimeout.current = window.setTimeout(() => {
          const pageWidth = currentTarget.scrollWidth / currentTarget.children.length
          onChangeIndex(Math.round(currentTarget.scrollLeft / pageWidth))
        }, 100)
      }}
    />
  )
}