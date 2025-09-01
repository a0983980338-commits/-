"use client"

import { useState } from "react"
import { Search, FileText, BookOpen, Users, Clock, ThumbsUp, ExternalLink, Filter, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

interface SearchResult {
  id: string
  title: string
  content: string
  type: "regulation" | "case" | "sop" | "faq"
  department: string
  lastUpdated: string
  relevanceScore: number
  tags: string[]
  author?: string
  helpfulVotes?: number
}

interface SearchResultsProps {
  query: string
  onBack: () => void
  onNewSearch: (query: string) => void
}

const mockSearchResults: SearchResult[] = [
  {
    id: "reg-001",
    title: "套房定義及貸款成數規定",
    content:
      "根據本行授信業務規章第3.2條，套房定義為：建築物登記面積15坪以下，且為單一房間含衛浴設備之住宅單位。套房貸款成數最高不得超過房屋鑑價之70%，且須符合以下條件...",
    type: "regulation",
    department: "授信部",
    lastUpdated: "2024-12-15",
    relevanceScore: 95,
    tags: ["套房", "貸款成數", "授信規章"],
  },
  {
    id: "case-001",
    title: "套房承作經驗分享 - 王資深經辦",
    content:
      "在承作套房貸款時，除了注意基本的成數限制外，還需要特別留意以下幾點：1. 套房所在區域的租金行情 2. 建物使用執照的用途別 3. 管委會是否有相關限制...",
    type: "case",
    department: "授信部",
    lastUpdated: "2024-12-10",
    relevanceScore: 88,
    tags: ["套房", "實戰經驗", "風險控制"],
    author: "王資深經辦",
    helpfulVotes: 23,
  },
  {
    id: "case-002",
    title: "套房應避免承作的案例分析",
    content:
      "以下案例提醒同仁在承作套房時應特別注意的風險點：某案例中，申請人購買之套房位於工業區內，雖符合面積定義，但因土地使用分區不符住宅用途...",
    type: "case",
    department: "授信部",
    lastUpdated: "2024-12-08",
    relevanceScore: 82,
    tags: ["套房", "風險案例", "土地使用分區"],
    author: "李主管",
    helpfulVotes: 18,
  },
]

const mockRelatedQueries = ["套房貸款利率計算", "小坪數住宅鑑價標準", "套房出租收益評估", "工業住宅貸款規定"]

export function SearchResults({ query, onBack, onNewSearch }: SearchResultsProps) {
  const [searchInput, setSearchInput] = useState(query)
  const [filterType, setFilterType] = useState<string>("all")

  const regulations = mockSearchResults.filter((result) => result.type === "regulation")
  const cases = mockSearchResults.filter((result) => result.type === "case")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "regulation":
        return <BookOpen className="h-4 w-4" />
      case "case":
        return <Users className="h-4 w-4" />
      case "sop":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "regulation":
        return <Badge variant="default">業務規章</Badge>
      case "case":
        return <Badge variant="secondary">實戰案例</Badge>
      case "sop":
        return <Badge variant="outline">作業流程</Badge>
      default:
        return <Badge variant="outline">其他</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search */}
      <header className="bg-card border-b border-border p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回儀表板
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="請輸入您的問題..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onNewSearch(searchInput)
                  }
                }}
                className="pl-10 h-12 text-lg bg-background border-2 border-border focus:border-primary"
              />
            </div>
            <Button size="lg" className="h-12 px-6" onClick={() => onNewSearch(searchInput)}>
              <Search className="h-5 w-5 mr-2" />
              搜尋
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant="default">找到 {mockSearchResults.length} 個相關結果</Badge>
              <Badge variant="outline">搜尋時間: 0.23秒</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-sm border border-border rounded px-2 py-1 bg-background"
              >
                <option value="all">全部類型</option>
                <option value="regulation">業務規章</option>
                <option value="case">實戰案例</option>
                <option value="sop">作業流程</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Search Results */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Regulations & SOPs */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">本行業務規章及作業流程</h2>
              <Badge variant="outline">{regulations.length}</Badge>
            </div>

            <div className="space-y-4">
              {regulations.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(result.type)}
                          <CardTitle className="text-lg">{result.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTypeBadge(result.type)}
                          <Badge variant="outline">{result.department}</Badge>
                          <span className="text-sm text-muted-foreground">相關度: {result.relevanceScore}%</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{result.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>更新於 {result.lastUpdated}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        查看原文
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Cases & Experiences */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">實戰案例與經驗分享</h2>
              <Badge variant="outline">{cases.length}</Badge>
            </div>

            <div className="space-y-4">
              {cases.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(result.type)}
                          <CardTitle className="text-lg">{result.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTypeBadge(result.type)}
                          <Badge variant="outline">{result.department}</Badge>
                          {result.author && <Badge variant="secondary">by {result.author}</Badge>}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{result.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{result.lastUpdated}</span>
                        </div>
                        {result.helpfulVotes && (
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{result.helpfulVotes} 人覺得有幫助</span>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        查看詳情
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Related Queries */}
        <div>
          <h3 className="text-lg font-semibold mb-4">相關搜尋建議</h3>
          <div className="flex flex-wrap gap-2">
            {mockRelatedQueries.map((relatedQuery) => (
              <Button
                key={relatedQuery}
                variant="outline"
                size="sm"
                onClick={() => onNewSearch(relatedQuery)}
                className="text-sm"
              >
                {relatedQuery}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
