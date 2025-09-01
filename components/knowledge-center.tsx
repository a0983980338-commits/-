"use client"

import { useState } from "react"
import {
  BookOpen,
  Upload,
  FileText,
  Users,
  Shield,
  Building2,
  CreditCard,
  Globe,
  Smartphone,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Clock,
  Tag,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface KnowledgeItem {
  id: string
  title: string
  content: string
  type: "sop" | "regulation" | "case" | "faq" | "document"
  department: string
  author: string
  createdAt: string
  updatedAt: string
  version: string
  status: "draft" | "published" | "archived"
  tags: string[]
  views: number
  favorites: number
  isFavorited?: boolean
}

interface KnowledgeCenterProps {
  onBack: () => void
}

const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: "kb-001",
    title: "套房定義及貸款成數規定",
    content: "根據本行授信業務規章第3.2條，套房定義為：建築物登記面積15坪以下...",
    type: "regulation",
    department: "授信部",
    author: "張主管",
    createdAt: "2024-12-01",
    updatedAt: "2024-12-15",
    version: "v2.1",
    status: "published",
    tags: ["套房", "貸款成數", "授信規章"],
    views: 245,
    favorites: 23,
    isFavorited: true,
  },
  {
    id: "kb-002",
    title: "存款繼承作業流程",
    content: "客戶辦理存款繼承時，應備妥以下文件：1. 被繼承人死亡證明書...",
    type: "sop",
    department: "存匯部",
    author: "李經理",
    createdAt: "2024-11-20",
    updatedAt: "2024-12-10",
    version: "v1.3",
    status: "published",
    tags: ["存款繼承", "作業流程", "客戶服務"],
    views: 189,
    favorites: 31,
  },
  {
    id: "kb-003",
    title: "不動產短期轉手風險評估案例",
    content: "某購屋貸款案例中，發現該不動產在一年內被轉手三次，經調查發現...",
    type: "case",
    department: "徵信部",
    author: "王資深經辦",
    createdAt: "2024-12-05",
    updatedAt: "2024-12-05",
    version: "v1.0",
    status: "published",
    tags: ["不動產", "風險評估", "徵信案例"],
    views: 156,
    favorites: 18,
  },
]

const departments = [
  { id: "all", name: "全部部門", icon: Building2 },
  { id: "credit", name: "授信部", icon: CreditCard },
  { id: "investigation", name: "徵信部", icon: FileText },
  { id: "deposit", name: "存匯部", icon: Building2 },
  { id: "digital", name: "電金部", icon: Smartphone },
  { id: "compliance", name: "法遵部", icon: Shield },
  { id: "forex", name: "外匯部", icon: Globe },
]

const documentTypes = [
  { id: "all", name: "全部類型" },
  { id: "sop", name: "作業流程" },
  { id: "regulation", name: "業務規章" },
  { id: "case", name: "實戰案例" },
  { id: "faq", name: "常見問題" },
  { id: "document", name: "其他文件" },
]

export function KnowledgeCenter({ onBack }: KnowledgeCenterProps) {
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [newDocument, setNewDocument] = useState({
    title: "",
    content: "",
    type: "sop",
    department: "credit",
    tags: "",
  })

  const filteredItems = mockKnowledgeItems.filter((item) => {
    const matchesDepartment =
      selectedDepartment === "all" ||
      item.department.includes(departments.find((d) => d.id === selectedDepartment)?.name || "")
    const matchesType = selectedType === "all" || item.type === selectedType
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDepartment && matchesType && matchesSearch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sop":
        return <FileText className="h-4 w-4" />
      case "regulation":
        return <BookOpen className="h-4 w-4" />
      case "case":
        return <Users className="h-4 w-4" />
      case "faq":
        return <Shield className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "sop":
        return <Badge variant="default">作業流程</Badge>
      case "regulation":
        return <Badge variant="secondary">業務規章</Badge>
      case "case":
        return <Badge variant="outline">實戰案例</Badge>
      case "faq":
        return <Badge variant="destructive">常見問題</Badge>
      default:
        return <Badge variant="outline">其他</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            已發布
          </Badge>
        )
      case "draft":
        return <Badge variant="secondary">草稿</Badge>
      case "archived":
        return <Badge variant="outline">已封存</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const handleUploadDocument = () => {
    // 這裡會實際處理文件上傳邏輯
    console.log("上傳文件:", newDocument)
    setShowUploadDialog(false)
    setNewDocument({
      title: "",
      content: "",
      type: "sop",
      department: "credit",
      tags: "",
    })
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
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">知識中心</h1>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">統一管理全行業務知識與經驗分享</p>
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  新增文件
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>新增知識文件</DialogTitle>
                  <DialogDescription>上傳新的業務規章、作業流程或實戰案例</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">文件標題</Label>
                    <Input
                      id="title"
                      value={newDocument.title}
                      onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                      placeholder="請輸入文件標題"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">文件類型</Label>
                      <Select
                        value={newDocument.type}
                        onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sop">作業流程</SelectItem>
                          <SelectItem value="regulation">業務規章</SelectItem>
                          <SelectItem value="case">實戰案例</SelectItem>
                          <SelectItem value="faq">常見問題</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department">歸屬部門</Label>
                      <Select
                        value={newDocument.department}
                        onValueChange={(value) => setNewDocument({ ...newDocument, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit">授信部</SelectItem>
                          <SelectItem value="investigation">徵信部</SelectItem>
                          <SelectItem value="deposit">存匯部</SelectItem>
                          <SelectItem value="digital">電金部</SelectItem>
                          <SelectItem value="compliance">法遵部</SelectItem>
                          <SelectItem value="forex">外匯部</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="content">文件內容</Label>
                    <Textarea
                      id="content"
                      value={newDocument.content}
                      onChange={(e) => setNewDocument({ ...newDocument, content: e.target.value })}
                      placeholder="請輸入文件內容"
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">標籤</Label>
                    <Input
                      id="tags"
                      value={newDocument.tags}
                      onChange={(e) => setNewDocument({ ...newDocument, tags: e.target.value })}
                      placeholder="請輸入標籤，以逗號分隔"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                      取消
                    </Button>
                    <Button onClick={handleUploadDocument}>
                      <Upload className="h-4 w-4 mr-2" />
                      上傳文件
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">分類瀏覽</TabsTrigger>
            <TabsTrigger value="favorites">我的收藏</TabsTrigger>
            <TabsTrigger value="recent">最近查看</TabsTrigger>
            <TabsTrigger value="manage">文件管理</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">篩選條件</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="搜尋文件標題或內容..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Knowledge Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Star className={`h-4 w-4 ${item.isFavorited ? "fill-yellow-400 text-yellow-400" : ""}`} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {getTypeBadge(item.type)}
                      {getStatusBadge(item.status)}
                      <Badge variant="outline">{item.department}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.content}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>作者: {item.author}</span>
                      <span>版本: {item.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>{item.favorites}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.updatedAt}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-3 w-3 mr-1" />
                        查看
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>我的收藏</CardTitle>
                <CardDescription>您收藏的重要文件和資料</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-4" />
                  <p>您還沒有收藏任何文件</p>
                  <p className="text-sm">點擊文件卡片上的星號來收藏重要資料</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>最近查看</CardTitle>
                <CardDescription>您最近查看過的文件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4" />
                  <p>暫無最近查看的文件</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>文件管理</CardTitle>
                <CardDescription>管理您創建和維護的文件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockKnowledgeItems.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getTypeIcon(item.type)}
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {getTypeBadge(item.type)}
                            {getStatusBadge(item.status)}
                            <span className="text-sm text-muted-foreground">更新於 {item.updatedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          編輯
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          預覽
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
