interface ThumbnailProps {
  variant?: "a" | "b" | "c" | "d" | "e"
}

const VARIANTS = {
  a: {
    words: ["CIRCLE", "TOOL"],
    elements: (
      <>
        <svg className="absolute top-12 left-16 opacity-30 -rotate-2" width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(210 80% 55%)" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="4" fill="hsl(210 80% 55%)" />
        </svg>
        <svg className="absolute bottom-14 right-20 opacity-80 rotate-1" width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="50" fill="none" stroke="hsl(210 80% 65%)" strokeWidth="2" />
          <line x1="28" y1="95" x2="112" y2="45" stroke="hsl(350 75% 55%)" strokeWidth="2" />
        </svg>
      </>
    ),
  },
  b: {
    words: ["AI", "AGENT"],
    elements: (
      <>
        <div className="absolute top-14 right-16 bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-sm font-mono text-white/60 -rotate-2 opacity-40">
          setCircle(300)
        </div>
        <div className="absolute bottom-16 left-14 bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-sm font-mono text-white/80 rotate-1 opacity-80">
          {"{ ok: true, diameter: 300 }"}
        </div>
      </>
    ),
  },
  c: {
    words: ["GEOMETRY", "DATA"],
    elements: (
      <>
        <div className="absolute top-10 left-10 opacity-30 -rotate-3">
          <div className="flex flex-col gap-1 text-xs font-mono text-white/60">
            <span>circumference: 628.3185</span>
            <span>area: 31415.9265</span>
            <span>sagitta: 12.8378</span>
          </div>
        </div>
        <div className="absolute bottom-12 right-12 opacity-80 rotate-2">
          <div className="flex flex-col gap-1 text-xs font-mono text-white/80 bg-white/5 rounded-lg p-3 border border-white/10">
            <span>arcLength: 98.17</span>
            <span>centralAngle: 44.05</span>
            <span>sectorArea: 4908.50</span>
          </div>
        </div>
      </>
    ),
  },
  d: {
    words: ["EXPORT"],
    elements: (
      <>
        <div className="absolute top-12 left-12 opacity-40 -rotate-1 flex gap-3">
          <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white/70">JPG</div>
          <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white/70">PNG</div>
          <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white/70">CSV</div>
          <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white/70">JSON</div>
        </div>
        <div className="absolute bottom-14 right-16 opacity-80 rotate-2 bg-white/5 border border-white/10 rounded-xl p-4">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="none" stroke="hsl(210 80% 65%)" strokeWidth="2" />
            <line x1="18" y1="68" x2="82" y2="32" stroke="hsl(350 75% 55%)" strokeWidth="2" />
          </svg>
        </div>
      </>
    ),
  },
  e: {
    words: ["CAD", "GEOMETRY", "TOOL"],
    elements: (
      <>
        {/* large circle with detailed construction lines - top left */}
        <svg className="absolute -top-6 -left-8 opacity-20" width="360" height="360" viewBox="0 0 360 360">
          <circle cx="180" cy="180" r="160" fill="none" stroke="hsl(210 80% 55%)" strokeWidth="1" />
          <circle cx="180" cy="180" r="160" fill="none" stroke="hsl(210 80% 55%)" strokeWidth="0.5" strokeDasharray="8 4" />
          <circle cx="180" cy="180" r="120" fill="none" stroke="hsl(210 80% 45%)" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="0" y1="180" x2="360" y2="180" stroke="hsl(210 80% 55%)" strokeWidth="0.5" strokeDasharray="6 6" />
          <line x1="180" y1="0" x2="180" y2="360" stroke="hsl(210 80% 55%)" strokeWidth="0.5" strokeDasharray="6 6" />
          <circle cx="180" cy="180" r="3" fill="hsl(210 80% 55%)" />
        </svg>

        {/* medium circle with chord - bottom right */}
        <svg className="absolute -bottom-4 -right-4 opacity-30 rotate-12" width="280" height="280" viewBox="0 0 280 280">
          <circle cx="140" cy="140" r="120" fill="none" stroke="hsl(210 80% 60%)" strokeWidth="1.5" />
          <line x1="36" y1="200" x2="244" y2="80" stroke="hsl(350 75% 55%)" strokeWidth="2" />
          {/* perpendicular from center to chord */}
          <line x1="140" y1="140" x2="118" y2="154" stroke="hsl(40 80% 55%)" strokeWidth="1" strokeDasharray="4 3" />
          {/* small right-angle indicator */}
          <rect x="113" y="145" width="8" height="8" fill="none" stroke="hsl(40 80% 55%)" strokeWidth="0.8" transform="rotate(-33 117 149)" />
          <circle cx="140" cy="140" r="2.5" fill="hsl(210 80% 60%)" />
        </svg>

        {/* geometry data panel - top right */}
        <div className="absolute top-10 right-10 opacity-60 rotate-1">
          <div className="bg-white/5 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex flex-col gap-1.5 text-xs font-mono">
              <div className="flex justify-between gap-6">
                <span className="text-white/40">diameter</span>
                <span className="text-white/80 tabular-nums">400.00</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-white/40">circumference</span>
                <span className="text-white/80 tabular-nums">1256.64</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-white/40">area</span>
                <span className="text-white/80 tabular-nums">125663.71</span>
              </div>
              <div className="h-px bg-white/10 my-1" />
              <div className="flex justify-between gap-6">
                <span className="text-white/40">chordLength</span>
                <span className="text-white/80 tabular-nums">320.00</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-white/40">sagitta</span>
                <span className="text-white/80 tabular-nums">40.00</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-white/40">arcLength</span>
                <span className="text-white/80 tabular-nums">369.15</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI tool call panel - bottom left */}
        <div className="absolute bottom-12 left-10 opacity-60 -rotate-1">
          <div className="flex flex-col gap-2">
            <div className="bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 backdrop-blur-sm">
              <span className="text-xs font-mono text-white/50">{">"}</span>
              <span className="text-xs font-mono text-white/80 ml-1">setCircle(400)</span>
            </div>
            <div className="bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 backdrop-blur-sm">
              <span className="text-xs font-mono text-white/50">{">"}</span>
              <span className="text-xs font-mono text-white/80 ml-1">setLine(320, 33)</span>
            </div>
            <div className="bg-white/8 border border-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
              <span className="text-[10px] font-mono text-emerald-400/80">{"{ ok: true }"}</span>
            </div>
          </div>
        </div>

        {/* export format chips - top center-left */}
        <div className="absolute top-12 left-[340px] opacity-30 flex gap-2">
          <div className="bg-white/8 border border-white/15 rounded-md px-2.5 py-1 text-[10px] font-mono text-white/60">JPG</div>
          <div className="bg-white/8 border border-white/15 rounded-md px-2.5 py-1 text-[10px] font-mono text-white/60">PNG</div>
          <div className="bg-white/8 border border-white/15 rounded-md px-2.5 py-1 text-[10px] font-mono text-white/60">CSV</div>
          <div className="bg-white/8 border border-white/15 rounded-md px-2.5 py-1 text-[10px] font-mono text-white/60">JSON</div>
        </div>

        {/* model selector chip - bottom center-right */}
        <div className="absolute bottom-14 right-[300px] opacity-25">
          <div className="bg-white/8 border border-white/15 rounded-full px-4 py-1.5 text-[10px] font-mono text-white/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
            claude-opus-4.5
          </div>
        </div>

        {/* small decorative angle arc */}
        <svg className="absolute top-[200px] right-[180px] opacity-15" width="60" height="60" viewBox="0 0 60 60">
          <path d="M 30 30 L 55 30" stroke="hsl(40 80% 55%)" strokeWidth="1" />
          <path d="M 30 30 L 44 12" stroke="hsl(40 80% 55%)" strokeWidth="1" />
          <path d="M 42 30 A 12 12 0 0 0 38 21" fill="none" stroke="hsl(40 80% 55%)" strokeWidth="0.8" />
          <text x="44" y="27" fill="hsl(40 80% 55%)" fontSize="7" fontFamily="monospace">33&deg;</text>
        </svg>
      </>
    ),
  },
}

export function Thumbnail({ variant = "a" }: ThumbnailProps) {
  const v = VARIANTS[variant]

  return (
    <div
      className="relative overflow-hidden bg-primary"
      style={{ width: 1200, height: 630 }}
    >
      {v.elements}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {v.words.map((word) => (
          <span
            key={word}
            className="font-mono font-black text-primary-foreground tracking-tighter leading-none"
            style={{ fontSize: variant === "e" ? "6.5rem" : "8rem" }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}
