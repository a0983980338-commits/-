"use client"

import type React from "react"
import { SmartAssistant } from "@/components/smart-assistant"
import { useState } from "react"
import {
  Search,
  Bell,
  Users,
  BookOpen,
  Shield,
  Building2,
  CreditCard,
  Globe,
  Smartphone,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchResults } from "@/components/search-results"
import { KnowledgeCenter } from "@/components/knowledge-center"
import { CollaborationSpace } from "@/components/collaboration-space"
import { EmergencyResponse } from "@/components/emergency-response"
import { BusinessCenter } from "@/components/business-center"

const navigationItems = [
  { id: "dashboard", label: "儀表板", icon: Building2, active: true },
  { id: "knowledge", label: "業務規章及實戰案例收藏", icon: BookOpen },
  { id: "collaboration", label: "跨部門溝通平台", icon: Users },
  { id: "ai-modules", label: "系統維修公告", icon: Shield },
  { id: "profile", label: "個人化設定", icon: Settings },
]

const businessCenters = [
  { id: "credit", label: "授信業務作戰中心", icon: CreditCard },
  { id: "investigation", label: "徵信業務作戰中心", icon: FileText },
  { id: "deposit", label: "存匯業務作戰中心", icon: Building2 },
  { id: "digital", label: "電金業務作戰中心", icon: Smartphone },
  { id: "compliance", label: "法令遵循業務作戰中心", icon: Shield },
  { id: "forex", label: "外匯業務作戰中心", icon: Globe },
]

const recentActivities = [
  { id: 1, title: "套房定義及貸款成數查詢", department: "授信部", time: "2分鐘前", type: "search" },
  { id: 2, title: "不動產估價短期轉手案例", department: "徵信部", time: "5分鐘前", type: "case" },
  { id: 3, title: "存款繼承文件準備", department: "存匯部", time: "8分鐘前", type: "sop" },
  { id: 4, title: "企網銀錯誤代碼9005解決方案", department: "電金部", time: "12分鐘前", type: "solution" },
]

export function ArkDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeNav, setActiveNav] = useState("dashboard")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [currentSearchQuery, setCurrentSearchQuery] = useState("")
  const [showKnowledgeCenter, setShowKnowledgeCenter] = useState(false)
  const [showCollaborationSpace, setShowCollaborationSpace] = useState(false)
  const [showEmergencyResponse, setShowEmergencyResponse] = useState(false)
  const [showBusinessCenter, setShowBusinessCenter] = useState(false)
  const [currentBusinessCenter, setCurrentBusinessCenter] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showSmartAssistant, setShowSmartAssistant] = useState(false)
  const [showInstantResults, setShowInstantResults] = useState(false)
  const [instantResults, setInstantResults] = useState<any[]>([])

  const scenarioQueries = [
    { id: "credit-newbie", label: "授信新人：查詢套房貸款規範", query: "套房定義及貸款成數", icon: CreditCard },
    { id: "investigation-case", label: "徵信經辦：不動產短期轉手估價", query: "不動產估價 短期內轉手", icon: FileText },
    { id: "deposit-inheritance", label: "存匯櫃員：存款繼承文件準備", query: "存款繼承需準備的文件", icon: Building2 },
    { id: "forex-remittance", label: "外匯櫃員：國外匯款注意事項", query: "匯款注意事項", icon: Globe },
  ]

  const handleInstantSearch = async (query: string) => {
    if (query.length > 2) {
      setShowInstantResults(true)
      const mockResults = [
        {
          type: "regulation",
          title: "套房定義及貸款成數規定",
          content: "根據本行規定，套房定義為室內面積15坪以下且無獨立廚房之住宅...",
          department: "授信部",
        },
        {
          type: "case",
          title: "套房承作經驗分享",
          content: "資深同仁分享：承作套房時需特別注意的三個要點...",
          department: "授信部",
        },
      ]
      setInstantResults(mockResults)
    } else {
      setShowInstantResults(false)
    }
  }

  const handleScenarioQuery = (scenario: any) => {
    setSearchQuery(scenario.query)
    handleNewSearch(scenario.query)
  }

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsSearching(true)
      setShowInstantResults(false)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setCurrentSearchQuery(searchQuery.trim())
      setShowSearchResults(true)
      setIsSearching(false)
    }
  }

  const handleNewSearch = (query: string) => {
    setCurrentSearchQuery(query)
    setSearchQuery(query)
    setShowSearchResults(true)
  }

  const handleBackToDashboard = () => {
    setShowSearchResults(false)
    setShowKnowledgeCenter(false)
    setShowCollaborationSpace(false)
    setShowEmergencyResponse(false)
    setShowBusinessCenter(false)
    setCurrentBusinessCenter("")
    setSearchQuery("")
    setActiveNav("dashboard")
  }

  const handleNavigateToKnowledge = () => {
    setShowKnowledgeCenter(true)
    setActiveNav("knowledge")
  }

  const handleNavigateToCollaboration = () => {
    setShowCollaborationSpace(true)
    setActiveNav("collaboration")
  }

  const handleNavigateToEmergency = () => {
    setShowEmergencyResponse(true)
    setActiveNav("ai-modules")
  }

  const handleNavigateToBusinessCenter = (centerId: string) => {
    setCurrentBusinessCenter(centerId)
    setShowBusinessCenter(true)
    setActiveNav("ai-modules")
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  if (showSearchResults) {
    return <SearchResults query={currentSearchQuery} onBack={handleBackToDashboard} onNewSearch={handleNewSearch} />
  }

  if (showKnowledgeCenter) {
    return <KnowledgeCenter onBack={handleBackToDashboard} />
  }

  if (showCollaborationSpace) {
    return <CollaborationSpace onBack={handleBackToDashboard} />
  }

  if (showEmergencyResponse) {
    return <EmergencyResponse onBack={handleBackToDashboard} />
  }

  if (showBusinessCenter) {
    return <BusinessCenter centerId={currentBusinessCenter} onBack={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-0 top-0 h-full w-80 ghibli-card border-r border-sidebar-border ghibli-float">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center ghibli-pulse shadow-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">方舟計畫</h1>
              <p className="text-sm text-muted-foreground">The Ark Project</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id)
                    if (item.id === "knowledge") {
                      handleNavigateToKnowledge()
                    }
                    if (item.id === "collaboration") {
                      handleNavigateToCollaboration()
                    }
                    if (item.id === "ai-modules") {
                      handleNavigateToEmergency()
                    }
                    if (item.id === "dashboard") {
                      handleBackToDashboard()
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                    activeNav === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg transform scale-[1.01]"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-sidebar-foreground mb-3">各部門業務彙總平台</h3>
            <div className="space-y-1">
              {businessCenters.map((center) => {
                const Icon = center.icon
                return (
                  <button
                    key={center.id}
                    onClick={() => handleNavigateToBusinessCenter(center.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-sm group"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{center.label}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="ml-80">
        <header className="ghibli-card border-b border-border p-6 sticky top-0 z-10 backdrop-blur-lg bg-card/90 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="請輸入您的問題，例如：套房定義及貸款成數、存款繼承文件..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handleInstantSearch(e.target.value)
                  }}
                  onKeyDown={handleSearchKeyDown}
                  className="pl-10 h-12 text-lg bg-background border-2 border-border focus:border-primary transition-all duration-300 focus:shadow-xl rounded-xl"
                  disabled={isSearching}
                />

                {showInstantResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl z-20 max-h-80 overflow-y-auto">
                    <div className="p-4">
                      <div className="text-sm font-medium text-muted-foreground mb-3">即時搜尋結果</div>
                      <div className="space-y-3">
                        {instantResults.map((result, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-lg hover:bg-accent cursor-pointer transition-all duration-200"
                            onClick={() => {
                              setSearchQuery(result.title)
                              handleNewSearch(result.title)
                              setShowInstantResults(false)
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <Badge
                                variant={result.type === "regulation" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {result.type === "regulation" ? "規章" : "案例"}
                              </Badge>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{result.title}</div>
                                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.content}</div>
                                <div className="text-xs text-primary mt-1">{result.department}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            handleSearch()
                            setShowInstantResults(false)
                          }}
                        >
                          查看完整搜尋結果
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Button
                size="lg"
                className="h-12 px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    搜尋中
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    搜尋
                  </>
                )}
              </Button>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-muted-foreground mb-3">快速情境查詢</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {scenarioQueries.map((scenario) => {
                  const Icon = scenario.icon
                  return (
                    <Button
                      key={scenario.id}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-3 text-left hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] rounded-xl bg-transparent"
                      onClick={() => handleScenarioQuery(scenario)}
                    >
                      <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-xs">{scenario.label}</span>
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="hover:bg-secondary/80 transition-all duration-300 cursor-pointer hover:scale-105 rounded-full"
              >
                AI 語意搜尋
              </Badge>
              <Badge
                variant="outline"
                className="hover:bg-accent transition-all duration-300 cursor-pointer hover:scale-105 rounded-full"
              >
                實戰案例
              </Badge>
              <Badge
                variant="outline"
                className="hover:bg-accent transition-all duration-300 cursor-pointer hover:scale-105 rounded-full"
              >
                專家問答
              </Badge>
            </div>
          </div>
        </header>

        <div className="p-6 pt-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 ghibli-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ghibli-float">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    常用功能
                  </CardTitle>
                  <CardDescription>快速存取您最常使用的功能</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-16 flex-col gap-2 bg-transparent hover:bg-accent/50 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-xl border-2"
                    >
                      <CreditCard className="h-6 w-6" />
                      <span>授信規章查詢</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex-col gap-2 bg-transparent hover:bg-accent/50 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-xl border-2"
                    >
                      <FileText className="h-6 w-6" />
                      <span>徵信案例庫</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex-col gap-2 bg-transparent hover:bg-accent/50 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-xl border-2"
                    >
                      <Building2 className="h-6 w-6" />
                      <span>存匯SOP</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex-col gap-2 bg-transparent hover:bg-accent/50 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-xl border-2"
                    >
                      <Globe className="h-6 w-6" />
                      <span>外匯作業指引</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="ghibli-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    最新動態
                  </CardTitle>
                  <CardDescription>全行同仁最新的查詢和分享</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-md border border-transparent hover:border-border/50"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 ghibli-pulse" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs rounded-full">
                              {activity.department}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 ghibli-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <CardTitle>數據統計</CardTitle>
                  <CardDescription>本月知識庫使用情況</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 rounded-xl hover:bg-accent/30 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50">
                      <div className="text-2xl font-bold text-primary">1,247</div>
                      <div className="text-sm text-muted-foreground">總搜尋次數</div>
                    </div>
                    <div className="text-center p-4 rounded-xl hover:bg-accent/30 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50">
                      <div className="text-2xl font-bold text-primary">89</div>
                      <div className="text-sm text-muted-foreground">新增案例</div>
                    </div>
                    <div className="text-center p-4 rounded-xl hover:bg-accent/30 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50">
                      <div className="text-2xl font-bold text-primary">156</div>
                      <div className="text-sm text-muted-foreground">專家回答</div>
                    </div>
                    <div className="text-center p-4 rounded-xl hover:bg-accent/30 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg border border-transparent hover:border-border/50">
                      <div className="text-2xl font-bold text-primary">98%</div>
                      <div className="text-sm text-muted-foreground">問題解決率</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <SmartAssistant isOpen={showSmartAssistant} onToggle={() => setShowSmartAssistant(!showSmartAssistant)} />
    </div>
  )
}
