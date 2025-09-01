"use client"

import { useState } from "react"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  links?: { title: string; url: string }[]
}

interface SmartAssistantProps {
  isOpen: boolean
  onToggle: () => void
}

export function SmartAssistant({ isOpen, onToggle }: SmartAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "您好！我是方舟智能助理，可以幫您快速查找業務規章、實戰案例和專家建議。請問有什麼可以協助您的嗎？",
      timestamp: new Date(),
      suggestions: ["套房定義及貸款成數", "存款繼承文件", "企網銀錯誤代碼", "外匯匯款規定"],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // 模擬AI回應
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAssistantResponse(inputMessage),
        timestamp: new Date(),
        links: [
          { title: "查看完整SOP文件", url: "#" },
          { title: "相關實戰案例", url: "#" },
        ],
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAssistantResponse = (query: string): string => {
    if (query.includes("套房") || query.includes("貸款")) {
      return "根據本行規定，套房定義為室內面積15坪以下且無獨立廚房之住宅。貸款成數最高為7成，需符合以下條件：1. 借款人信用良好 2. 收入穩定 3. 房屋位置適當。"
    }
    if (query.includes("繼承") || query.includes("存款")) {
      return "存款繼承需準備文件：1. 被繼承人死亡證明書 2. 戶籍謄本 3. 繼承系統表 4. 印鑑證明 5. 身分證正本。建議先至分行櫃檯諮詢詳細流程。"
    }
    return "我已經為您搜尋相關資訊，以下是最相關的規章和案例。如需更詳細的協助，我可以為您轉接專家或發布到相關協作頻道。"
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50 ghibli-pulse"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 ghibli-card border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5 text-primary" />
            智能助理
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-[400px]">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div>
                  <div
                    className={`p-3 rounded-xl ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent text-xs"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {message.links && (
                    <div className="space-y-1 mt-2">
                      {message.links.map((link, index) => (
                        <Button key={index} variant="link" size="sm" className="h-auto p-0 text-xs">
                          {link.title}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted p-3 rounded-xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="輸入您的問題..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
