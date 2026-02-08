interface ThumbnailProps {
  variant?: "a" | "b" | "c" | "d"
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
            style={{ fontSize: "8rem" }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}
