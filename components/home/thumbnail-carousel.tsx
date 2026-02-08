"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface Variant {
  id: string
  label: string
  words: string[]
  elements: React.ReactNode
}

const VARIANTS: Variant[] = [
  {
    id: "e",
    label: "CAD Geometry Tool",
    words: ["CAD", "GEOMETRY", "TOOL"],
    elements: (
      <>
        {/* large circle with construction lines */}
        <svg className="absolute -top-4 -left-4 opacity-20" width="200" height="200" viewBox="0 0 360 360">
          <circle cx="180" cy="180" r="160" fill="none" stroke="hsl(210 80% 55%)" strokeWidth="1" />
          <circle cx="180" cy="180" r="160" fill="none" stroke="hsl(210 80% 55%)" strokeWidth="0.5" strokeDasharray="8 4" />
          <circle cx="180" cy="180" r="120" fill="none" stroke="hsl(210 80% 45%)" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="0" y1="180" x2="360" y2="180" stroke="hsl(210 80% 55%)" strokeWidth="0.5" strokeDasharray="6 6" />
          <line x1="180" y1="0" x2="180" y2="360" stroke="hsl(210 80% 55%)" strokeWidth="0.5" strokeDasharray="6 6" />
          <circle cx="180" cy="180" r="3" fill="hsl(210 80% 55%)" />
        </svg>
        {/* circle+chord bottom right */}
        <svg className="absolute -bottom-2 -right-2 opacity-30 rotate-12" width="160" height="160" viewBox="0 0 280 280">
          <circle cx="140" cy="140" r="120" fill="none" stroke="hsl(210 80% 60%)" strokeWidth="1.5" />
          <line x1="36" y1="200" x2="244" y2="80" stroke="hsl(350 75% 55%)" strokeWidth="2" />
          <line x1="140" y1="140" x2="118" y2="154" stroke="hsl(40 80% 55%)" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="140" cy="140" r="2.5" fill="hsl(210 80% 60%)" />
        </svg>
        {/* data panel */}
        <div className="absolute top-5 right-4 opacity-50">
          <div className="bg-white/5 border border-white/15 rounded-lg p-2">
            <div className="flex flex-col gap-0.5 text-[8px] font-mono">
              <div className="flex justify-between gap-3">
                <span className="text-white/40">diameter</span>
                <span className="text-white/70 tabular-nums">400</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-white/40">area</span>
                <span className="text-white/70 tabular-nums">125663</span>
              </div>
            </div>
          </div>
        </div>
        {/* tool call */}
        <div className="absolute bottom-6 left-4 opacity-50">
          <div className="bg-white/5 border border-white/15 rounded-md px-2 py-1">
            <span className="text-[8px] font-mono text-white/60">setCircle(400)</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "a",
    label: "Circle Tool",
    words: ["CIRCLE", "TOOL"],
    elements: (
      <>
        <svg className="absolute top-6 left-8 opacity-30 -rotate-2" width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(210 80% 55%)" strokeWidth="2" />
          <circle cx="60" cy="60" r="3" fill="hsl(210 80% 55%)" />
        </svg>
        <svg className="absolute bottom-8 right-12 opacity-80 rotate-1" width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" fill="none" stroke="hsl(210 80% 65%)" strokeWidth="1.5" />
          <line x1="15" y1="55" x2="65" y2="25" stroke="hsl(350 75% 55%)" strokeWidth="1.5" />
        </svg>
      </>
    ),
  },
  {
    id: "b",
    label: "AI Agent",
    words: ["AI", "AGENT"],
    elements: (
      <>
        <div className="absolute top-8 right-10 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-[11px] font-mono text-white/60 -rotate-2 opacity-40">
          setCircle(300)
        </div>
        <div className="absolute bottom-10 left-8 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-[11px] font-mono text-white/80 rotate-1 opacity-80">
          {"{ ok: true, diameter: 300 }"}
        </div>
      </>
    ),
  },
  {
    id: "c",
    label: "Geometry",
    words: ["GEOMETRY", "DATA"],
    elements: (
      <>
        <div className="absolute top-6 left-6 opacity-30 -rotate-3">
          <div className="flex flex-col gap-0.5 text-[10px] font-mono text-white/60">
            <span>circumference: 628.32</span>
            <span>area: 31415.93</span>
            <span>sagitta: 12.84</span>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 opacity-80 rotate-2">
          <div className="flex flex-col gap-0.5 text-[10px] font-mono text-white/80 bg-white/5 rounded p-2 border border-white/10">
            <span>arcLength: 98.17</span>
            <span>centralAngle: 44.05</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "d",
    label: "Export",
    words: ["EXPORT"],
    elements: (
      <>
        <div className="absolute top-8 left-8 opacity-40 -rotate-1 flex gap-2">
          <div className="bg-white/10 border border-white/20 rounded px-2 py-1 text-[10px] font-mono text-white/70">JPG</div>
          <div className="bg-white/10 border border-white/20 rounded px-2 py-1 text-[10px] font-mono text-white/70">PNG</div>
          <div className="bg-white/10 border border-white/20 rounded px-2 py-1 text-[10px] font-mono text-white/70">CSV</div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-80 rotate-2 bg-white/5 border border-white/10 rounded-lg p-2">
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <circle cx="32" cy="32" r="24" fill="none" stroke="hsl(210 80% 65%)" strokeWidth="1.5" />
              <line x1="12" y1="44" x2="52" y2="20" stroke="hsl(350 75% 55%)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </>
    ),
  },
]

const INTERVAL = 5000

export function ThumbnailCarousel() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const startRef = useRef(Date.now())
  const rafRef = useRef<number>(0)

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % VARIANTS.length)
    setProgress(0)
    startRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (paused) {
      cancelAnimationFrame(rafRef.current)
      return
    }

    startRef.current = Date.now() - progress * INTERVAL

    function tick() {
      const elapsed = Date.now() - startRef.current
      const pct = Math.min(elapsed / INTERVAL, 1)
      setProgress(pct)
      if (pct >= 1) {
        advance()
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused, active, advance, progress])

  function selectVariant(i: number) {
    setActive(i)
    setProgress(0)
    startRef.current = Date.now()
  }

  const v = VARIANTS[active]

  return (
    <div className="flex flex-col gap-4">
      {/* thumbnail display */}
      <div
        className="relative w-full overflow-hidden rounded-lg border border-border"
        style={{ aspectRatio: "1200/630" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute inset-0 bg-primary">
          {/* floating UI elements */}
          {v.elements}

          {/* big words */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            {v.words.map((word) => (
              <span
                key={word}
                className="font-mono font-black text-primary-foreground tracking-tighter leading-none"
                style={{ fontSize: v.words.length > 2 ? "clamp(1.5rem, 6vw, 3.8rem)" : "clamp(2rem, 8vw, 5rem)" }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-foreground/10">
          <div
            className="h-full bg-primary-foreground/40 transition-none"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* chip selectors + open link */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          {VARIANTS.map((variant, i) => (
            <button
              key={variant.id}
              onClick={() => selectVariant(i)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                i === active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
        <Link
          href={`/thumbnail?v=${v.id}`}
          target="_blank"
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          Open full-size <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
