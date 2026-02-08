import Link from "next/link"
import {
  ArrowRight,
  Circle,
  MessageCircle,
  Download,
  Copy,
  SlidersHorizontal,
  Cpu,
  Palette,
  Maximize,
  Wrench,
  Image,
  FileText,
  Star,
  Smartphone,
} from "lucide-react"
import { FeatureTicker } from "@/components/home/feature-ticker"
import { ThumbnailCarousel } from "@/components/home/thumbnail-carousel"

const FEATURES = [
  {
    icon: Circle,
    title: "Canvas Renderer",
    description:
      "HTML5 Canvas with HiDPI support, configurable dot grid, circle and chord drawing with labeled measurements. Redraws on resize.",
    href: "/tool",
  },
  {
    icon: Cpu,
    title: "Geometry Engine",
    description:
      "Computes circumference, area, chord distance from center, sagitta, central angle, arc length, sector area, and segment area in real time.",
    href: "/tool",
  },
  {
    icon: MessageCircle,
    title: "AI Chatbot",
    description:
      "Claude Opus 4.5 via Vercel AI Gateway. Natural language control of the canvas through tool calling. Ask it to draw, resize, or remove shapes.",
    href: "/tool",
  },
  {
    icon: Wrench,
    title: "Tool Calling",
    description:
      "Four client-side tools (setCircle, setLine, removeCircle, removeLine) wired via AI SDK 6. The LLM reads current geometry state and acts on it.",
    href: "/tool",
  },
  {
    icon: SlidersHorizontal,
    title: "Chord Sliders",
    description:
      "Adjust chord length and rotation angle with real-time sliders. Values sync between inputs, sliders, and AI commands.",
    href: "/tool",
  },
  {
    icon: Download,
    title: "Export Image",
    description:
      "Download as JPG (configurable quality and background color) or PNG (with transparency). Scale from 1x to 4x. Toggle grid and labels.",
    href: "/tool",
  },
  {
    icon: Copy,
    title: "Copy Data",
    description:
      "Copy all computed geometry as JSON or CSV with a preview modal. One-click clipboard copy.",
    href: "/tool",
  },
  {
    icon: Maximize,
    title: "Responsive Layout",
    description:
      "Chat sidebar slides in from the left without squeezing the canvas. Right sidebar stacks below on mobile. ResizeObserver keeps the canvas sharp.",
    href: "/tool",
  },
  {
    icon: Palette,
    title: "Design Tokens",
    description:
      "Full light/dark theme via CSS custom properties. All colors, radii, and sidebar tokens are configurable in globals.css.",
    href: "/tool",
  },
]

const DEPS = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS",
  "shadcn/ui",
  "AI SDK 6",
  "Vercel AI Gateway",
  "Lucide Icons",
  "Recharts",
  "Zod",
  "TypeScript",
]

const BRAND_ASSETS = [
  { label: "Thumbnail", href: "/thumbnail?v=a" },
  { label: "OG Image", href: "/thumbnail?v=a" },
  { label: "Apple Touch Icon", href: "/brand-assets" },
  { label: "Favicon", href: "/brand-assets" },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ticker */}
      <FeatureTicker />

      {/* hero */}
      <section className="px-4 py-8 md:py-12 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-balance text-foreground leading-tight">
          A circle geometry tool with an AI agent built in
        </h1>
        <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto text-pretty">
          Canvas rendering, live geometry computation, export, and natural-language control via Claude. Fork it and build on it.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link
            href="/tool"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Open the tool <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* thumbnail carousel */}
      <section className="px-4 max-w-4xl mx-auto pb-10">
        <ThumbnailCarousel />
      </section>

      {/* feature cards */}
      <section className="px-4 max-w-4xl mx-auto pb-12">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          What{"'"}s in the box
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group border border-border rounded-lg p-4 flex flex-col gap-2 hover:border-foreground/20 transition-colors bg-card"
            >
              <div className="flex items-center gap-2">
                <f.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">{f.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* tech stack + brand assets */}
      <section className="px-4 max-w-4xl mx-auto pb-12 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {DEPS.map((d) => (
              <span
                key={d}
                className="text-xs font-mono px-2.5 py-1 rounded-full border border-border text-muted-foreground bg-card"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="md:w-64">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Brand Assets
          </h2>
          <div className="flex flex-wrap gap-2">
            {BRAND_ASSETS.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="text-xs font-mono px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors bg-card"
              >
                {a.label}
              </Link>
            ))}
            <Link
              href="/brand-assets"
              className="text-xs font-mono px-2.5 py-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              View All &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* explore cards */}
      <section className="px-4 max-w-4xl mx-auto pb-16">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Explore
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/tool"
            className="group border border-border rounded-lg p-6 flex flex-col gap-2 hover:border-foreground/20 transition-colors bg-card"
          >
            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5 text-foreground" />
              <span className="text-base font-semibold text-foreground">Circle Tool</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The interactive editor. Draw circles, add chords, compute geometry, and talk to the AI agent.
            </p>
            <span className="text-xs text-muted-foreground group-hover:text-foreground mt-1 flex items-center gap-1 transition-colors">
              Open <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
          <Link
            href="/brand-assets"
            className="group border border-border rounded-lg p-6 flex flex-col gap-2 hover:border-foreground/20 transition-colors bg-card"
          >
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-foreground" />
              <span className="text-base font-semibold text-foreground">Brand Assets</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Thumbnails, OG images, favicons, and touch icons. All generated from the app{"'"}s design tokens.
            </p>
            <span className="text-xs text-muted-foreground group-hover:text-foreground mt-1 flex items-center gap-1 transition-colors">
              View <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
