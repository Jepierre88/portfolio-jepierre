/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const DEFAULT_CHARACTER_SET = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
)

type HyperTextProps<TAs extends React.ElementType> = {
  children: string
  className?: string
  /** Duration of the animation in milliseconds */
  duration?: number
  /** Delay before animation starts (in ms) */
  delay?: number
  /** Component to render as */
  as?: TAs
  /** Start animation when component is in view */
  startOnView?: boolean
  /** Enable hover animation */
  animateOnHover?: boolean
  /** Custom character set for scramble effect */
  characterSet?: string[]
} & Omit<React.ComponentPropsWithoutRef<TAs>, "as" | "children" | "className">

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(media.matches)
    onChange()
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    }
    // Safari
    media.addListener(onChange)
    return () => media.removeListener(onChange)
  }, [])
  return reduced
}

function isScrambleEligible(char: string) {
  // keep whitespace as-is; scramble letters/numbers/punctuation lightly
  return char.trim().length > 0
}

function pickRandom(chars: string[]) {
  return chars[Math.floor(Math.random() * chars.length)]
}

export function HyperText<TAs extends React.ElementType = "div">(
  props: HyperTextProps<TAs>
) {
  const {
    children,
    className,
    duration = 800,
    delay = 0,
    as,
    startOnView = false,
    animateOnHover = true,
    characterSet = DEFAULT_CHARACTER_SET,
    ...rest
  } = props

  const Comp = (as ?? "div") as React.ElementType
  const prefersReducedMotion = usePrefersReducedMotion()

  const [display, setDisplay] = React.useState(children)
  const targetRef = React.useRef<HTMLSpanElement | null>(null)

  const rafRef = React.useRef<number | null>(null)
  const timeoutRef = React.useRef<number | null>(null)
  const runningRef = React.useRef(false)

  const stop = React.useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    runningRef.current = false
  }, [])

  const run = React.useCallback(() => {
    if (prefersReducedMotion) {
      setDisplay(children)
      return
    }
    if (runningRef.current) return

    stop()
    runningRef.current = true

    const startAt = performance.now() + Math.max(0, delay)
    const endAt = startAt + Math.max(0, duration)
    const text = children

    const tick = (now: number) => {
      if (!runningRef.current) return
      if (now < startAt) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const t = Math.min(1, (now - startAt) / Math.max(1, duration))
      const revealCount = Math.floor(t * text.length)

      const next = text
        .split("")
        .map((char, idx) => {
          if (!isScrambleEligible(char)) return char
          if (idx < revealCount) return char
          return pickRandom(characterSet)
        })
        .join("")

      setDisplay(next)

      if (now >= endAt) {
        setDisplay(text)
        runningRef.current = false
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [children, characterSet, delay, duration, prefersReducedMotion, stop])

  React.useEffect(() => {
    setDisplay(children)
  }, [children])

  React.useEffect(() => {
    if (!startOnView) return
    const node = targetRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [run, startOnView])

  React.useEffect(() => stop, [stop])

  return (
    <Comp
      {...rest}
      ref={targetRef as any}
      className={cn("inline-block", className)}
      onMouseEnter={(e: React.MouseEvent) => {
        if (animateOnHover) run()
        props.onMouseEnter?.(e as any)
      }}
    >
      {display}
    </Comp>
  )
}
