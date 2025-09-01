"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  BookOpen,
  Users,
  TrendingUp,
  FileText,
  MessageSquare,
  Star,
  Building2,
  CreditCard,
  Globe,
  Smartphone,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BusinessCenterProps {
  centerId: string
  onBack: () => void
}

const centerConfig = {
  credit: {
    name: "授信業務作戰中心",
    icon: CreditCard,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "授信業務規章、案例與協作平台",
    quickActions: [
      { name: "套房定義查詢", count: "156次" },
      { name: "貸款成數規定", count: "89次" },
      { name: "擔保品評估", count: "67次" },
      { name: "授信額度計算", count: "45次" },
    ],
    recentCases: [
      { title: "套房貸款承作注意事項", author: "王經理", time: "2小時前", helpful: 12 },
      { title: "購屋貸款風險評估案例", author: "李專員", time: "4小時前", helpful: 8 },
      { title: "企業授信額度調整流程", author: "陳副理", time: "1天前", helpful: 15 },
    ],
  },
  investigation: {
    name: "徵信業務作戰中心",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "徵信調查、風險評估與案例分享",
    quickActions: [
      { name: "不動產估價", count: "134次" },
      { name: "信用評估", count: "98次" },
      { name: "財務分析", count: "76次" },
      { name: "擔保品查核", count: "54次" },
    ],
    recentCases: [
      { title: "短期轉手不動產估價要點", author: "林調查員", time: "1小時前", helpful: 18 },
      { title: "企業財務異常指標識別", author: "張專員", time: "3小時前", helpful: 22 },
      { title: "個人信用評估實務案例", author: "劉經理", time: "5小時前", helpful: 14 },
    ],
  },
  deposit: {
    name: "存匯業務作戰中心",
    icon: Building2,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "存匯作業、客戶服務與問題解決",
    quickActions: [
      { name: "存款繼承", count: "89次" },
      { name: "匯款作業", count: "156次" },
      { name: "開戶流程", count: "67次" },
      { name: "印鑑變更", count: "43次" },
    ],
    recentCases: [
      { title: "存款繼承文件準備清單", author: "陳櫃員", time: "30分鐘前", helpful: 25 },
      { title: "複雜匯款案例處理", author: "黃主任", time: "2小時前", helpful: 19 },
      { title: "VIP客戶服務標準", author: "吳經理", time: "4小時前", helpful: 16 },
    ],
  },
  digital: {
    name: "電金業務作戰中心",
    icon: Smartphone,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "電子金融、網銀系統與技術支援",
    quickActions: [
      { name: "錯誤代碼查詢", count: "234次" },
      { name: "網銀操作指引", count: "178次" },
      { name: "系統故障處理", count: "89次" },
      { name: "客戶端問題", count: "67次" },
    ],
    recentCases: [
      { title: "企網銀9005錯誤解決方案", author: "趙專員", time: "15分鐘前", helpful: 31 },
      { title: "行動銀行登入問題排除", author: "錢工程師", time: "1小時前", helpful: 24 },
      { title: "數位憑證更新流程", author: "孫經理", time: "3小時前", helpful: 18 },
    ],
  },
  compliance: {
    name: "法令遵循業務作戰中心",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "法規遵循、風險管控與應變處理",
    quickActions: [
      { name: "AML規定", count: "145次" },
      { name: "法規更新", count: "98次" },
      { name: "內控制度", count: "76次" },
      { name: "稽核要點", count: "54次" },
    ],
    recentCases: [
      { title: "AML系統異常應變流程", author: "蔡經理", time: "即時", helpful: 45 },
      { title: "新版洗錢防制規定解析", author: "馬副理", time: "2小時前", helpful: 38 },
      { title: "內控自評注意事項", author: "周專員", time: "6小時前", helpful: 29 },
    ],
  },
  forex: {
    name: "外匯業務作戰中心",
    icon: Globe,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    description: "外匯交易、匯率風險與國際業務",
    quickActions: [
      { name: "匯款規定", count: "167次" },
      { name: "匯率查詢", count: "134次" },
      { name: "外匯額度", count: "89次" },
      { name: "國際貿易", count: "67次" },
    ],
    recentCases: [
      { title: "特定國家匯款注意事項", author: "黃資深", time: "45分鐘前", helpful: 28 },
      { title: "外匯風險控管實務", author: "楊經理", time: "2小時前", helpful: 22 },
      { title: "貿易融資案例分析", author: "許副理", time: "4小時前", helpful: 19 },
    ],
  },
}

export function BusinessCenter({ centerId, onBack }: BusinessCenterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const config = centerConfig[centerId as keyof typeof centerConfig]

  if (!config) {
    return <div>業務中心不存在</div>
  }

  const Icon = config.icon

  const handleSearch = () => {
    // 實現搜尋功能
    console.log("搜尋:", searchQuery)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回儀表板
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${config.color}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{config.name}</h1>
                <p className="text-muted-foreground">{config.description}</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={`搜尋${config.name.replace("業務作戰中心", "")}相關資訊...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button size="lg" className="h-12 px-6" onClick={handleSearch}>
              <Search className="h-5 w-5 mr-2" />
              搜尋
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">總覽</TabsTrigger>
              <TabsTrigger value="knowledge">知識庫</TabsTrigger>
              <TabsTrigger value="cases">實戰案例</TabsTrigger>
              <TabsTrigger value="collaboration">協作討論</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      熱門查詢
                    </CardTitle>
                    <CardDescription>本週最常查詢的業務項目</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {config.quickActions.map((action, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <div className="font-medium">{action.name}</div>
                          <div className="text-sm text-muted-foreground">查詢 {action.count}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Cases */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      最新案例
                    </CardTitle>
                    <CardDescription>同仁最新分享的實戰經驗</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {config.recentCases.map((case_, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <h4 className="font-medium text-sm mb-2">{case_.title}</h4>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {case_.author} • {case_.time}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              <span>{case_.helpful}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>業務統計</CardTitle>
                  <CardDescription>本月{config.name}使用情況</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${config.color}`}>342</div>
                      <div className="text-sm text-muted-foreground">總查詢次數</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${config.color}`}>28</div>
                      <div className="text-sm text-muted-foreground">新增案例</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${config.color}`}>156</div>
                      <div className="text-sm text-muted-foreground">協作討論</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${config.color}`}>95%</div>
                      <div className="text-sm text-muted-foreground">問題解決率</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge">
              <Card>
                <CardHeader>
                  <CardTitle>知識庫</CardTitle>
                  <CardDescription>{config.name}相關的規章制度與作業流程</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4" />
                    <p>知識庫內容開發中...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cases">
              <Card>
                <CardHeader>
                  <CardTitle>實戰案例</CardTitle>
                  <CardDescription>同仁分享的實際業務處理經驗</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <p>案例庫內容開發中...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaboration">
              <Card>
                <CardHeader>
                  <CardTitle>協作討論</CardTitle>
                  <CardDescription>{config.name}專屬的討論群組</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <p>協作功能開發中...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
