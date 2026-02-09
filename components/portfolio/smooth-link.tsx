"use client"

import * as React from "react"

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function SmoothLink(
  props: React.ComponentPropsWithoutRef<"a"> & { href: string }
) {
  const { href, onClick, ...rest } = props

  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return

        // Only intercept plain left-clicks
        if (e.button !== 0) return
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

        if (!href.startsWith("#")) return

        const id = href.slice(1)
        const target = document.getElementById(id)
        if (!target) return

        e.preventDefault()

        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        })

        // Keep URL hash in sync (without jump)
        history.pushState(null, "", href)
      }}
    />
  )
}
