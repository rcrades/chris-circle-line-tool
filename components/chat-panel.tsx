"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const MODELS = [
  { value: "anthropic/claude-opus-4.5", label: "Opus 4.5", tier: "best" },
  { value: "anthropic/claude-sonnet-4", label: "Sonnet 4", tier: "mid" },
  { value: "anthropic/claude-haiku-3-5", label: "Haiku 3.5", tier: "cheap" },
] as const

export function ChatPanel() {
  const [input, setInput] = useState("")
  const [model, setModel] = useState<string>(MODELS[0].value)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const transport = useRef(
    new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: { id, messages, model },
      }),
    })
  )

  // Rebuild transport when model changes so the body closure captures the new model
  useEffect(() => {
    transport.current = new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: { id, messages, model },
      }),
    })
  }, [model])

  const { messages, sendMessage, status } = useChat({
    get transport() {
      return transport.current
    },
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* model picker */}
      <div className="px-1 pb-3">
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MODELS.map((m) => (
              <SelectItem key={m.value} value={m.value} className="text-xs">
                <span>{m.label}</span>
                <span className="ml-2 text-muted-foreground">
                  ({m.tier})
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Ask me anything about circle geometry.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`text-sm rounded-lg px-3 py-2 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground ml-8"
                : "bg-muted text-foreground mr-8"
            }`}
          >
            {message.parts.map((part, i) => {
              if (part.type === "text") {
                return (
                  <span key={i} className="whitespace-pre-wrap">
                    {part.text}
                  </span>
                )
              }
              return null
            })}
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="bg-muted text-foreground text-sm rounded-lg px-3 py-2 mr-8 animate-pulse">
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* input */}
      <form onSubmit={handleSubmit} className="pt-3 flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about circles..."
          className="min-h-[40px] max-h-32 resize-none text-sm"
          rows={1}
          disabled={isLoading}
        />
        <Button type="submit" size="icon" className="shrink-0 h-10 w-10" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}
