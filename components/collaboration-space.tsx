"use client"

import { useState } from "react"
import {
  Users,
  Plus,
  Hash,
  Lock,
  Send,
  Paperclip,
  Search,
  Settings,
  UserPlus,
  MoreVertical,
  ArrowLeft,
  Phone,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Group {
  id: string
  name: string
  description: string
  type: "public" | "private"
  department: string
  memberCount: number
  lastActivity: string
  unreadCount?: number
  isJoined?: boolean
}

interface Message {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  type: "text" | "file" | "system"
  fileName?: string
  replyTo?: string
}

interface CollaborationSpaceProps {
  onBack: () => void
}

const mockGroups: Group[] = [
  {
    id: "group-001",
    name: "授信業務討論",
    description: "授信相關業務問題討論與經驗分享",
    type: "public",
    department: "授信部",
    memberCount: 45,
    lastActivity: "5分鐘前",
    unreadCount: 3,
    isJoined: true,
  },
  {
    id: "group-002",
    name: "徵信案例研討",
    description: "徵信案例分析與風險評估討論",
    type: "public",
    department: "徵信部",
    memberCount: 32,
    lastActivity: "15分鐘前",
    unreadCount: 1,
    isJoined: true,
  },
  {
    id: "group-003",
    name: "存匯櫃檯服務",
    description: "存匯業務操作與客戶服務經驗交流",
    type: "public",
    department: "存匯部",
    memberCount: 67,
    lastActivity: "1小時前",
    isJoined: false,
  },
  {
    id: "group-004",
    name: "數位金融創新小組",
    description: "電子金融產品開發與創新討論",
    type: "private",
    department: "電金部",
    memberCount: 12,
    lastActivity: "2小時前",
    unreadCount: 5,
    isJoined: true,
  },
]

const mockMessages: Message[] = [
  {
    id: "msg-001",
    author: "張經理",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "大家好，關於套房貸款的新規定，我整理了一份文件供大家參考。",
    timestamp: "14:30",
    type: "text",
  },
  {
    id: "msg-002",
    author: "張經理",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "套房貸款新規定.pdf",
    timestamp: "14:31",
    type: "file",
    fileName: "套房貸款新規定.pdf",
  },
  {
    id: "msg-003",
    author: "李專員",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "謝謝張經理！這個很實用，我昨天剛好遇到相關案例。",
    timestamp: "14:35",
    type: "text",
    replyTo: "msg-001",
  },
  {
    id: "msg-004",
    author: "王資深",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "請問這個規定是從什麼時候開始實施的？",
    timestamp: "14:40",
    type: "text",
  },
]

export function CollaborationSpace({ onBack }: CollaborationSpaceProps) {
  const [activeTab, setActiveTab] = useState("groups")
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    type: "public" as "public" | "private",
    department: "credit",
  })

  const filteredGroups = mockGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateGroup = () => {
    console.log("創建群組:", newGroup)
    setShowCreateDialog(false)
    setNewGroup({
      name: "",
      description: "",
      type: "public",
      department: "credit",
    })
  }

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("發送訊息:", messageInput)
      setMessageInput("")
    }
  }

  const handleJoinGroup = (groupId: string) => {
    console.log("加入群組:", groupId)
  }

  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-background flex">
        {/* Group Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <header className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedGroup(null)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回群組列表
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    {selectedGroup.type === "private" ? (
                      <Lock className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <Hash className="h-5 w-5 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{selectedGroup.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedGroup.memberCount} 位成員 • {selectedGroup.department}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{message.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{message.author}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    {message.replyTo && (
                      <div className="bg-muted/50 border-l-2 border-primary pl-3 py-1 mb-2 text-sm">
                        回覆: {mockMessages.find((m) => m.id === message.replyTo)?.content.slice(0, 50)}...
                      </div>
                    )}
                    {message.type === "file" ? (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg max-w-xs">
                        <Paperclip className="h-4 w-4" />
                        <span className="text-sm font-medium">{message.fileName}</span>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="輸入訊息..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Group Info Sidebar */}
        <div className="w-80 bg-card border-l border-border p-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">群組資訊</h3>
              <p className="text-sm text-muted-foreground">{selectedGroup.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">成員 ({selectedGroup.memberCount})</h3>
              <div className="space-y-2">
                {["張經理", "李專員", "王資深", "陳同仁"].map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{member[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">共享檔案</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer">
                  <Paperclip className="h-4 w-4" />
                  <span className="text-sm">套房貸款新規定.pdf</span>
                </div>
              </div>
            </div>
          </div>
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
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">協作空間</h1>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">跨部門協作與即時溝通平台</p>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  創建群組
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>創建新群組</DialogTitle>
                  <DialogDescription>建立專案或主題討論群組，促進團隊協作</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="groupName">群組名稱</Label>
                    <Input
                      id="groupName"
                      value={newGroup.name}
                      onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                      placeholder="請輸入群組名稱"
                    />
                  </div>
                  <div>
                    <Label htmlFor="groupDescription">群組描述</Label>
                    <Textarea
                      id="groupDescription"
                      value={newGroup.description}
                      onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                      placeholder="請輸入群組描述"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">歸屬部門</Label>
                    <Select
                      value={newGroup.department}
                      onValueChange={(value) => setNewGroup({ ...newGroup, department: value })}
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
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="groupType"
                      checked={newGroup.type === "private"}
                      onCheckedChange={(checked) => setNewGroup({ ...newGroup, type: checked ? "private" : "public" })}
                    />
                    <Label htmlFor="groupType">私密群組</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      取消
                    </Button>
                    <Button onClick={handleCreateGroup}>創建群組</Button>
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="groups">所有群組</TabsTrigger>
            <TabsTrigger value="my-groups">我的群組</TabsTrigger>
            <TabsTrigger value="departments">部門頻道</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜尋群組..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          {group.type === "private" ? (
                            <Lock className="h-5 w-5 text-primary-foreground" />
                          ) : (
                            <Hash className="h-5 w-5 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={group.type === "private" ? "secondary" : "default"}>
                              {group.type === "private" ? "私密" : "公開"}
                            </Badge>
                            <Badge variant="outline">{group.department}</Badge>
                          </div>
                        </div>
                      </div>
                      {group.unreadCount && (
                        <Badge
                          variant="destructive"
                          className="rounded-full w-6 h-6 flex items-center justify-center p-0"
                        >
                          {group.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{group.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{group.memberCount} 位成員</span>
                      <span>最後活動: {group.lastActivity}</span>
                    </div>
                    <div className="flex gap-2">
                      {group.isJoined ? (
                        <Button variant="default" size="sm" className="flex-1" onClick={() => setSelectedGroup(group)}>
                          進入群組
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleJoinGroup(group.id)}
                        >
                          加入群組
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-groups">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockGroups
                .filter((group) => group.isJoined)
                .map((group) => (
                  <Card key={group.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            {group.type === "private" ? (
                              <Lock className="h-5 w-5 text-primary-foreground" />
                            ) : (
                              <Hash className="h-5 w-5 text-primary-foreground" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{group.name}</CardTitle>
                            <Badge variant="outline">{group.department}</Badge>
                          </div>
                        </div>
                        {group.unreadCount && (
                          <Badge
                            variant="destructive"
                            className="rounded-full w-6 h-6 flex items-center justify-center p-0"
                          >
                            {group.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                      <Button variant="default" size="sm" className="w-full" onClick={() => setSelectedGroup(group)}>
                        進入群組
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="departments">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["授信部", "徵信部", "存匯部", "電金部", "法遵部", "外匯部"].map((dept) => (
                <Card key={dept}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      {dept}官方頻道
                    </CardTitle>
                    <CardDescription>{dept}的官方公告與討論頻道</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">125 位成員</span>
                      <Button variant="outline" size="sm">
                        加入頻道
                      </Button>
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
