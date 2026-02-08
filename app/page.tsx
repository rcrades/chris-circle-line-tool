"use client"

import { useState } from "react"
import { Copy, Check, Download, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CircleCanvas } from "@/components/circle-canvas"
import { GeometryData } from "@/components/geometry-data"
import { ExportModal } from "@/components/export-modal"
import { ChatPanel } from "@/components/chat-panel"
import { computeGeometry, geometryToJSON, geometryToCSV } from "@/lib/geometry"

export default function Page() {
  const [diameter, setDiameter] = useState<number | null>(null)
  const [chordLength, setChordLength] = useState<number | null>(null)
  const [chordAngle, setChordAngle] = useState(30)

  // temp inputs for the "add" flows
  const [diameterInput, setDiameterInput] = useState("200")
  const [chordInput, setChordInput] = useState("140")

  const [copyOpen, setCopyOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const hasCircle = diameter !== null
  const hasChord = chordLength !== null

  const geometry = hasCircle ? computeGeometry(diameter, chordLength, chordAngle) : null
  const jsonPreview = geometry ? geometryToJSON(geometry) : ""
  const csvPreview = geometry ? geometryToCSV(geometry) : ""

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setChatOpen(true)} className="text-muted-foreground">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Chat</span>
          </Button>
          {hasCircle && (
            <Button variant="ghost" size="sm" onClick={() => setExportOpen(true)} className="text-muted-foreground">
              <Download className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}
          {hasCircle && (
            <Button variant="ghost" size="sm" onClick={() => setCopyOpen(true)} className="text-muted-foreground">
              <Copy className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Copy</span>
            </Button>
          )}
          {hasCircle && (
            <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
              Reset
            </Button>
          )}
        </div>
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
                    onChange={(e) => {
                      setChordInput(e.target.value)
                      if (hasChord) {
                        const l = Number(e.target.value)
                        if (l > 0) setChordLength(l)
                      }
                    }}
                    onKeyDown={(e) => e.key === "Enter" && addLine()}
                  />
                </div>
                <Button size="sm" onClick={addLine}>
                  {hasChord ? "Update" : "Add"}
                </Button>
              </div>

              {hasChord && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Length: {chordLength}
                    </Label>
                    <Slider
                      min={1}
                      max={diameter ?? 200}
                      step={1}
                      value={[chordLength ?? 1]}
                      onValueChange={([v]) => {
                        setChordLength(v)
                        setChordInput(String(v))
                      }}
                    />
                  </div>
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
                </>
              )}
            </section>
          )}

          {/* computed data */}
          <section className="flex flex-col gap-2">
            <GeometryData diameter={diameter} chordLength={chordLength} chordAngle={chordAngle} />
          </section>
        </aside>
      </div>
      {hasCircle && (
        <ExportModal
          open={exportOpen}
          onOpenChange={setExportOpen}
          diameter={diameter}
          chordLength={chordLength}
          chordAngle={chordAngle}
        />
      )}
      <Sheet open={chatOpen} onOpenChange={setChatOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle>Chat</SheetTitle>
            <SheetDescription>Ask about circle geometry</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-hidden mt-2">
            <ChatPanel />
          </div>
        </SheetContent>
      </Sheet>
      <Dialog open={copyOpen} onOpenChange={setCopyOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Copy Data</DialogTitle>
            <DialogDescription>Preview and copy geometry data as JSON or CSV.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="json" onValueChange={() => setCopied(false)}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="json">JSON</TabsTrigger>
                <TabsTrigger value="csv">CSV</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="json">
              <pre className="rounded-md border border-border bg-muted/50 p-3 text-xs font-mono overflow-auto max-h-64">
                {jsonPreview}
              </pre>
              <Button
                size="sm"
                className="mt-3 w-full"
                onClick={() => copyToClipboard(jsonPreview)}
              >
                {copied ? <><Check className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy JSON</>}
              </Button>
            </TabsContent>
            <TabsContent value="csv">
              <pre className="rounded-md border border-border bg-muted/50 p-3 text-xs font-mono overflow-auto max-h-64">
                {csvPreview}
              </pre>
              <Button
                size="sm"
                className="mt-3 w-full"
                onClick={() => copyToClipboard(csvPreview)}
              >
                {copied ? <><Check className="h-4 w-4 mr-1" /> Copied</> : <><Copy className="h-4 w-4 mr-1" /> Copy CSV</>}
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </main>
  )
}
