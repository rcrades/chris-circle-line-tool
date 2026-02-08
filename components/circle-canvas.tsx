"use client"

import { useRef, useEffect } from "react"

interface CircleCanvasProps {
  diameter: number | null
  chordLength: number | null
  chordAngle: number
}

export function CircleCanvas({ diameter, chordLength, chordAngle }: CircleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height

    // clear
    ctx.clearRect(0, 0, w, h)

    // draw grid dots
    ctx.fillStyle = "hsl(0 0% 85%)"
    const spacing = 20
    for (let x = spacing; x < w; x += spacing) {
      for (let y = spacing; y < h; y += spacing) {
        ctx.beginPath()
        ctx.arc(x, y, 0.8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    if (!diameter) {
      // empty state — prompt text
      ctx.fillStyle = "hsl(0 0% 60%)"
      ctx.font = "14px system-ui, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Add a circle to get started", w / 2, h / 2)
      return
    }

    const cx = w / 2
    const cy = h / 2
    const radius = Math.min(diameter / 2, Math.min(w, h) / 2 - 40)

    // circle fill
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fillStyle = "hsl(210 80% 55% / 0.08)"
    ctx.fill()

    // circle stroke
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "hsl(210 80% 55%)"
    ctx.lineWidth = 2
    ctx.stroke()

    // center dot
    ctx.beginPath()
    ctx.arc(cx, cy, 3, 0, Math.PI * 2)
    ctx.fillStyle = "hsl(210 80% 55%)"
    ctx.fill()

    // diameter label
    ctx.fillStyle = "hsl(210 80% 40%)"
    ctx.font = "11px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(`d = ${diameter}`, cx, cy - radius - 10)

    // draw chord
    if (chordLength && chordLength > 0) {
      const halfChord = Math.min(chordLength / 2, radius)
      const angleRad = (chordAngle * Math.PI) / 180

      // distance from center to chord (perpendicular distance)
      const dist = Math.sqrt(Math.max(0, radius * radius - halfChord * halfChord))

      // chord midpoint is offset from center perpendicular to chord direction
      const perpX = -Math.sin(angleRad)
      const perpY = Math.cos(angleRad)

      const midX = cx + perpX * dist
      const midY = cy + perpY * dist

      // chord endpoints
      const dirX = Math.cos(angleRad)
      const dirY = Math.sin(angleRad)

      const x1 = midX - dirX * halfChord
      const y1 = midY - dirY * halfChord
      const x2 = midX + dirX * halfChord
      const y2 = midY + dirY * halfChord

      // chord line
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = "hsl(350 75% 55%)"
      ctx.lineWidth = 2
      ctx.stroke()

      // chord endpoints
      ctx.fillStyle = "hsl(350 75% 55%)"
      ctx.beginPath()
      ctx.arc(x1, y1, 3.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x2, y2, 3.5, 0, Math.PI * 2)
      ctx.fill()

      // dashed line from center to chord midpoint (perpendicular distance)
      if (dist > 5) {
        ctx.beginPath()
        ctx.setLineDash([4, 4])
        ctx.moveTo(cx, cy)
        ctx.lineTo(midX, midY)
        ctx.strokeStyle = "hsl(0 0% 55%)"
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.setLineDash([])

        // label the distance
        const labelX = (cx + midX) / 2 + perpX * 12
        const labelY = (cy + midY) / 2 + perpY * 12
        ctx.fillStyle = "hsl(0 0% 45%)"
        ctx.font = "10px system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(`d=${dist.toFixed(1)}`, labelX, labelY)
      }

      // chord length label
      ctx.fillStyle = "hsl(350 75% 40%)"
      ctx.font = "11px system-ui, sans-serif"
      ctx.textAlign = "center"
      const labelOffsetX = perpX * -16
      const labelOffsetY = perpY * -16
      ctx.fillText(
        `l = ${chordLength}`,
        (x1 + x2) / 2 + labelOffsetX,
        (y1 + y2) / 2 + labelOffsetY
      )
    }
  }, [diameter, chordLength, chordAngle])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg border border-border bg-card"
      style={{ minHeight: 300 }}
    />
  )
}
