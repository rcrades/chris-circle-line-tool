"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { CircleCanvas } from "@/components/circle-canvas"
import { GeometryData } from "@/components/geometry-data"

export default function Page() {
  const [diameter, setDiameter] = useState<number | null>(null)
  const [chordLength, setChordLength] = useState<number | null>(null)
  const [chordAngle, setChordAngle] = useState(30)

  // temp inputs for the "add" flows
  const [diameterInput, setDiameterInput] = useState("200")
  const [chordInput, setChordInput] = useState("140")

  const hasCircle = diameter !== null
  const hasChord = chordLength !== null

  function addCircle() {
    const d = Number(diameterInput)
    if (d > 0) {
      setDiameter(d)
      // reset chord if it no longer fits
      if (chordLength && chordLength > d) {
        setChordLength(null)
      }
    }
  }

  function addLine() {
    const l = Number(chordInput)
    if (l > 0) setChordLength(l)
  }

  function reset() {
    setDiameter(null)
    setChordLength(null)
    setChordAngle(30)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* header */}
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-base font-semibold text-foreground">Circle Tool</h1>
        {hasCircle && (
          <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
            Reset
          </Button>
        )}
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-53px)]">
        {/* canvas area */}
        <div className="flex-1 p-4">
          <CircleCanvas diameter={diameter} chordLength={chordLength} chordAngle={chordAngle} />
        </div>

        {/* sidebar */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border p-4 flex flex-col gap-6 overflow-y-auto">
          {/* add circle */}
          <section className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {hasCircle ? "Circle" : "Add a Circle"}
            </h2>
            <div className="flex items-end gap-2">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label htmlFor="diameter" className="text-xs text-muted-foreground">
                  Diameter
                </Label>
                <Input
                  id="diameter"
                  type="number"
                  min={1}
                  value={diameterInput}
                  onChange={(e) => setDiameterInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCircle()}
                />
              </div>
              <Button size="sm" onClick={addCircle}>
                {hasCircle ? "Update" : "Add"}
              </Button>
            </div>
          </section>

          {/* add chord / line */}
          {hasCircle && (
            <section className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {hasChord ? "Chord / Line" : "Add a Line"}
              </h2>
              <div className="flex items-end gap-2">
                <div className="flex-1 flex flex-col gap-1.5">
                  <Label htmlFor="chord" className="text-xs text-muted-foreground">
                    Length
                  </Label>
                  <Input
                    id="chord"
                    type="number"
                    min={1}
                    max={diameter ?? undefined}
                    value={chordInput}
                    onChange={(e) => setChordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addLine()}
                  />
                </div>
                <Button size="sm" onClick={addLine}>
                  {hasChord ? "Update" : "Add"}
                </Button>
              </div>

              {hasChord && (
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Angle: {chordAngle}&deg;
                  </Label>
                  <Slider
                    min={0}
                    max={360}
                    step={1}
                    value={[chordAngle]}
                    onValueChange={([v]) => setChordAngle(v)}
                  />
                </div>
              )}
            </section>
          )}

          {/* computed data */}
          <section className="flex flex-col gap-2">
            <GeometryData diameter={diameter} chordLength={chordLength} chordAngle={chordAngle} />
          </section>
        </aside>
      </div>
    </main>
  )
}
