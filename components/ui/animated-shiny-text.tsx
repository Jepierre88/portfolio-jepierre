/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"

import { cn } from "@/lib/utils"

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: {
  children: React.ReactNode
  className?: string
  shimmerWidth?: number
}) {
  return (
    <span
      className={cn("relative inline-block", className)}
      style={{
        // Used by the utility class in globals.css
        ["--shimmer-width" as any]: `${shimmerWidth}px`,
      }}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-20 text-transparent bg-clip-text",
          "animate-shiny-text",
          // Light glare (keeps palette neutral; actual text color comes from parent)
          "bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)]",
          "dark:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.25),transparent)]",
          "bg-size-[var(--shimmer-width)_100%]",
          "bg-no-repeat"
        )}
      >
        {children}
      </span>
    </span>
  )
}
