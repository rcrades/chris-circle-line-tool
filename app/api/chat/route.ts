import {
  consumeStream,
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai"

export const maxDuration = 60

export async function POST(req: Request) {
  const {
    messages,
    model = "anthropic/claude-opus-4.5",
  }: { messages: UIMessage[]; model?: string } = await req.json()

  const result = streamText({
    model,
    system:
      "You are a helpful geometry assistant embedded in a circle-and-chord analysis tool. Help the user understand circle geometry, chord properties, arcs, sectors, and segments. Keep answers concise and practical.",
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
