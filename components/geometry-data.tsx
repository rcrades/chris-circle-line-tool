"use client"

interface GeometryDataProps {
  diameter: number | null
  chordLength: number | null
  chordAngle: number
}

function Row({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex items-baseline justify-between py-1.5 border-b border-border last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-mono font-medium text-foreground">
        {value}
        {unit && <span className="text-muted-foreground ml-1">{unit}</span>}
      </span>
    </div>
  )
}

export function GeometryData({ diameter, chordLength, chordAngle }: GeometryDataProps) {
  if (!diameter) {
    return (
      <p className="text-sm text-muted-foreground py-4 text-center">
        Add a circle to see computed data.
      </p>
    )
  }

  const radius = diameter / 2
  const circumference = Math.PI * diameter
  const area = Math.PI * radius * radius

  // chord-related computations
  let sagitta: number | null = null
  let centralAngle: number | null = null
  let arcLength: number | null = null
  let chordDistFromCenter: number | null = null
  let sectorArea: number | null = null
  let segmentArea: number | null = null

  if (chordLength && chordLength > 0 && chordLength <= diameter) {
    const halfChord = chordLength / 2
    chordDistFromCenter = Math.sqrt(radius * radius - halfChord * halfChord)
    sagitta = radius - chordDistFromCenter
    centralAngle = 2 * Math.asin(halfChord / radius) * (180 / Math.PI)
    const centralAngleRad = (centralAngle * Math.PI) / 180
    arcLength = radius * centralAngleRad
    sectorArea = 0.5 * radius * radius * centralAngleRad
    segmentArea = sectorArea - 0.5 * chordLength * chordDistFromCenter
  }

  const fmt = (n: number) => {
    if (Number.isInteger(n)) return n.toString()
    return n.toFixed(4)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Circle
        </h3>
        <div className="flex flex-col">
          <Row label="Diameter" value={fmt(diameter)} unit="px" />
          <Row label="Radius" value={fmt(radius)} unit="px" />
          <Row label="Circumference" value={fmt(circumference)} unit="px" />
          <Row label="Area" value={fmt(area)} unit="px\u00B2" />
        </div>
      </div>

      {chordLength && chordLength > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Chord / Line
          </h3>
          <div className="flex flex-col">
            <Row label="Chord length" value={fmt(chordLength)} unit="px" />
            <Row label="Rotation angle" value={`${chordAngle}\u00B0`} />
            {chordLength > diameter ? (
              <p className="text-sm text-destructive py-2">
                Chord exceeds diameter. Must be &le; {diameter}.
              </p>
            ) : (
              <>
                {chordDistFromCenter !== null && (
                  <Row label="Distance from center" value={fmt(chordDistFromCenter)} unit="px" />
                )}
                {sagitta !== null && (
                  <Row label="Sagitta" value={fmt(sagitta)} unit="px" />
                )}
                {centralAngle !== null && (
                  <Row label="Central angle" value={`${fmt(centralAngle)}\u00B0`} />
                )}
                {arcLength !== null && (
                  <Row label="Arc length (minor)" value={fmt(arcLength)} unit="px" />
                )}
                {sectorArea !== null && (
                  <Row label="Sector area" value={fmt(sectorArea)} unit="px\u00B2" />
                )}
                {segmentArea !== null && (
                  <Row label="Segment area" value={fmt(segmentArea)} unit="px\u00B2" />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
