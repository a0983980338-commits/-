"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Shield,
  Megaphone,
  Clock,
  Users,
  Plus,
  Eye,
  CheckCircle,
  ArrowLeft,
  FileText,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EmergencyEvent {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  status: "active" | "resolved" | "monitoring"
  affectedSystems: string[]
  startTime: string
  estimatedResolution?: string
  responseTeam: string[]
  updates: EventUpdate[]
}

interface EventUpdate {
  id: string
  timestamp: string
  author: string
  type: "announcement" | "instruction" | "qa" | "status"
  title: string
  content: string
  isPublic: boolean
}

interface QAItem {
  id: string
  question: string
  answer: string
  author: string
  timestamp: string
  category: string
}

interface EmergencyResponseProps {
  onBack: () => void
}

const mockEmergencyEvents: EmergencyEvent[] = [
  {
    id: "event-001",
    title: "AML系統異常",
    description: "反洗錢系統出現連線異常，影響全行交易監控功能",
    severity: "critical",
    status: "active",
    affectedSystems: ["AML系統", "交易監控", "風險管理"],
    startTime: "2024-12-20 09:15",
    estimatedResolution: "2024-12-20 12:00",
    responseTeam: ["法遵處", "資訊處", "風管處"],
    updates: [
      {
        id: "update-001",
        timestamp: "09:15",
        author: "法遵處-蔡宜芳",
        type: "announcement",
        title: "緊急公告：AML系統異常",
        content: "各分行同仁請注意，AML系統目前出現異常，請暫停所有大額交易審核，等待進一步指示。",
        isPublic: true,
      },
      {
        id: "update-002",
        timestamp: "09:30",
        author: "資訊處-技術組",
        type: "instruction",
        title: "臨時作業指引",
        content: "1. 所有超過50萬元的交易請人工審核\n2. 記錄客戶資料並建立臨時清單\n3. 系統恢復後統一補登",
        isPublic: true,
      },
    ],
  },
]

const mockQAItems: QAItem[] = [
  {
    id: "qa-001",
    question: "AML系統異常期間，客戶要求緊急匯款怎麼處理？",
    answer: "請依照臨時作業指引，進行人工審核。金額超過50萬請聯繫法遵處確認。",
    author: "法遵處-蔡宜芳",
    timestamp: "09:45",
    category: "作業流程",
  },
  {
    id: "qa-002",
    question: "系統預計什麼時候恢復？",
    answer: "技術團隊正在緊急修復中，預計12:00前恢復正常。會隨時更新進度。",
    author: "資訊處-技術組",
    timestamp: "10:15",
    category: "系統狀態",
  },
]

export function EmergencyResponse({ onBack }: EmergencyResponseProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedEvent, setSelectedEvent] = useState<EmergencyEvent | null>(null)
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false)
  const [showInstructionDialog, setShowInstructionDialog] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    severity: "high" as "critical" | "high" | "medium" | "low",
    affectedSystems: "",
  })
  const [newInstruction, setNewInstruction] = useState({
    title: "",
    content: "",
    category: "operation",
  })
  const [newQA, setNewQA] = useState({
    question: "",
    answer: "",
    category: "作業流程",
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "monitoring":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handlePublishAnnouncement = () => {
    console.log("發布緊急公告:", newAnnouncement)
    setShowAnnouncementDialog(false)
    setNewAnnouncement({
      title: "",
      content: "",
      severity: "high",
      affectedSystems: "",
    })
  }

  const handlePublishInstruction = () => {
    console.log("發布作業指引:", newInstruction)
    setShowInstructionDialog(false)
    setNewInstruction({
      title: "",
      content: "",
      category: "operation",
    })
  }

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-background">
        {/* Event Header */}
        <header className="bg-red-50 border-b border-red-200 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回應變中心
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-red-900">{selectedEvent.title}</h1>
                  <p className="text-red-700">{selectedEvent.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className={getSeverityColor(selectedEvent.severity)}>
                {selectedEvent.severity === "critical"
                  ? "緊急"
                  : selectedEvent.severity === "high"
                    ? "高"
                    : selectedEvent.severity === "medium"
                      ? "中"
                      : "低"}
                級事件
              </Badge>
              <Badge className={getStatusColor(selectedEvent.status)}>
                {selectedEvent.status === "active"
                  ? "進行中"
                  : selectedEvent.status === "resolved"
                    ? "已解決"
                    : "監控中"}
              </Badge>
              <span className="text-sm text-red-700">開始時間: {selectedEvent.startTime}</span>
              {selectedEvent.estimatedResolution && (
                <span className="text-sm text-red-700">預計解決: {selectedEvent.estimatedResolution}</span>
              )}
            </div>
          </div>
        </header>

        {/* Event Management */}
        <div className="max-w-6xl mx-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">事件總覽</TabsTrigger>
              <TabsTrigger value="announcements">公告管理</TabsTrigger>
              <TabsTrigger value="instructions">作業指引</TabsTrigger>
              <TabsTrigger value="qa">問答中心</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">影響系統</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedEvent.affectedSystems.map((system) => (
                        <Badge key={system} variant="outline">
                          {system}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">應變團隊</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedEvent.responseTeam.map((team) => (
                        <Badge key={team} variant="secondary">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">統計資訊</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>已發布公告:</span>
                        <span className="font-medium">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>作業指引:</span>
                        <span className="font-medium">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>問答項目:</span>
                        <span className="font-medium">{mockQAItems.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>事件時間軸</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedEvent.updates.map((update) => (
                      <div key={update.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{update.title}</span>
                            <Badge variant={update.type === "announcement" ? "destructive" : "default"}>
                              {update.type === "announcement" ? "公告" : "指引"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{update.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">作者: {update.author}</p>
                          <p className="text-sm whitespace-pre-line">{update.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="announcements" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">緊急公告管理</h3>
                <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Megaphone className="h-4 w-4 mr-2" />
                      發布緊急公告
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>發布全行緊急公告</DialogTitle>
                      <DialogDescription>此公告將立即推送給全行所有同仁</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="announcementTitle">公告標題</Label>
                        <Input
                          id="announcementTitle"
                          value={newAnnouncement.title}
                          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                          placeholder="請輸入緊急公告標題"
                        />
                      </div>
                      <div>
                        <Label htmlFor="announcementContent">公告內容</Label>
                        <Textarea
                          id="announcementContent"
                          value={newAnnouncement.content}
                          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                          placeholder="請輸入詳細的公告內容"
                          rows={6}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="severity">緊急程度</Label>
                          <Select
                            value={newAnnouncement.severity}
                            onValueChange={(value: any) => setNewAnnouncement({ ...newAnnouncement, severity: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">緊急</SelectItem>
                              <SelectItem value="high">高</SelectItem>
                              <SelectItem value="medium">中</SelectItem>
                              <SelectItem value="low">低</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="affectedSystems">影響系統</Label>
                          <Input
                            id="affectedSystems"
                            value={newAnnouncement.affectedSystems}
                            onChange={(e) =>
                              setNewAnnouncement({ ...newAnnouncement, affectedSystems: e.target.value })
                            }
                            placeholder="請輸入受影響的系統"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowAnnouncementDialog(false)}>
                          取消
                        </Button>
                        <Button onClick={handlePublishAnnouncement} className="bg-red-600 hover:bg-red-700">
                          <Megaphone className="h-4 w-4 mr-2" />
                          立即發布
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {selectedEvent.updates
                  .filter((u) => u.type === "announcement")
                  .map((announcement) => (
                    <Card key={announcement.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive">緊急公告</Badge>
                            <span className="text-sm text-muted-foreground">{announcement.timestamp}</span>
                          </div>
                        </div>
                        <CardDescription>發布者: {announcement.author}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-line">{announcement.content}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="instructions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">臨時作業指引</h3>
                <Dialog open={showInstructionDialog} onOpenChange={setShowInstructionDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      發布作業指引
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>發布臨時作業指引</DialogTitle>
                      <DialogDescription>為應變事件提供具體的操作指引</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="instructionTitle">指引標題</Label>
                        <Input
                          id="instructionTitle"
                          value={newInstruction.title}
                          onChange={(e) => setNewInstruction({ ...newInstruction, title: e.target.value })}
                          placeholder="請輸入作業指引標題"
                        />
                      </div>
                      <div>
                        <Label htmlFor="instructionContent">指引內容</Label>
                        <Textarea
                          id="instructionContent"
                          value={newInstruction.content}
                          onChange={(e) => setNewInstruction({ ...newInstruction, content: e.target.value })}
                          placeholder="請輸入詳細的作業步驟"
                          rows={8}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowInstructionDialog(false)}>
                          取消
                        </Button>
                        <Button onClick={handlePublishInstruction}>
                          <FileText className="h-4 w-4 mr-2" />
                          發布指引
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {selectedEvent.updates
                  .filter((u) => u.type === "instruction")
                  .map((instruction) => (
                    <Card key={instruction.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{instruction.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="default">作業指引</Badge>
                            <span className="text-sm text-muted-foreground">{instruction.timestamp}</span>
                          </div>
                        </div>
                        <CardDescription>發布者: {instruction.author}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <pre className="whitespace-pre-line text-sm">{instruction.content}</pre>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="qa" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">問答中心</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  新增問答
                </Button>
              </div>

              <div className="space-y-4">
                {mockQAItems.map((qa) => (
                  <Card key={qa.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Q: {qa.question}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{qa.category}</Badge>
                          <span className="text-sm text-muted-foreground">{qa.timestamp}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                        <p className="font-medium text-green-800">A: {qa.answer}</p>
                        <p className="text-sm text-green-600 mt-2">回答者: {qa.author}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回儀表板
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">重大事件應變中心</h1>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">統一指揮與協調重大事件應變作業</p>
            <div className="flex gap-2">
              <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Megaphone className="h-4 w-4 mr-2" />
                    緊急公告
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>發布全行緊急公告</DialogTitle>
                    <DialogDescription>此公告將立即推送給全行所有同仁</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="announcementTitle">公告標題</Label>
                      <Input
                        id="announcementTitle"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                        placeholder="請輸入緊急公告標題"
                      />
                    </div>
                    <div>
                      <Label htmlFor="announcementContent">公告內容</Label>
                      <Textarea
                        id="announcementContent"
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                        placeholder="請輸入詳細的公告內容"
                        rows={6}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowAnnouncementDialog(false)}>
                        取消
                      </Button>
                      <Button onClick={handlePublishAnnouncement} className="bg-red-600 hover:bg-red-700">
                        <Megaphone className="h-4 w-4 mr-2" />
                        立即發布
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">系統狀態</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-2xl font-bold">1</span>
                <span className="text-sm text-muted-foreground">異常</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">進行中事件</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-2xl font-bold">1</span>
                <span className="text-sm text-muted-foreground">事件</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">應變團隊</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-2xl font-bold">3</span>
                <span className="text-sm text-muted-foreground">部門</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">平均解決時間</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-2xl font-bold">2.5</span>
                <span className="text-sm text-muted-foreground">小時</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Events */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-red-500" />
              進行中的緊急事件
            </CardTitle>
            <CardDescription>需要立即關注和處理的事件</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEmergencyEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity === "critical" ? "緊急" : "高"}級
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>進行中</Badge>
                        <span className="text-xs text-muted-foreground">開始時間: {event.startTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-medium">影響系統: {event.affectedSystems.length}</p>
                      <p className="text-sm text-muted-foreground">應變團隊: {event.responseTeam.length}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      查看詳情
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Events History */}
        <Card>
          <CardHeader>
            <CardTitle>最近事件記錄</CardTitle>
            <CardDescription>過去30天的事件處理記錄</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">分行交易系統維護</h4>
                    <p className="text-sm text-muted-foreground">定期維護導致的短暫服務中斷</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-800">已解決</Badge>
                      <span className="text-xs text-muted-foreground">2024-12-18 22:00 - 23:30</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">處理時間: 1.5小時</p>
                  <p className="text-sm text-muted-foreground">負責部門: 資訊處</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">外匯交易系統異常</h4>
                    <p className="text-sm text-muted-foreground">匯率更新延遲導致的交易暫停</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-800">已解決</Badge>
                      <span className="text-xs text-muted-foreground">2024-12-15 14:20 - 16:45</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">處理時間: 2.4小時</p>
                  <p className="text-sm text-muted-foreground">負責部門: 外匯部</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
