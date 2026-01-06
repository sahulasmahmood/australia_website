"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useFeedback, Feedback } from "@/hooks/use-feedback"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import {
  MessageSquare,
  Search,
  Filter,
  Edit,
  Trash2,
  AlertCircle,
  Loader2,
  Eye,
  ThumbsUp,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  FileText,
} from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function FeedbackManager() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [feedbackToDelete, setFeedbackToDelete] = useState<Feedback | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const { feedbacks, pagination, stats, isLoading, mutate } = useFeedback({
    page: currentPage,
    limit: 10,
    search: searchTerm,
    status: statusFilter,
    feedbackType: typeFilter,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800"
      case "reviewed": return "bg-yellow-100 text-yellow-800"
      case "in-progress": return "bg-purple-100 text-purple-800"
      case "resolved": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "compliment": return "bg-green-100 text-green-800"
      case "suggestion": return "bg-blue-100 text-blue-800"
      case "concern": return "bg-orange-100 text-orange-800"
      case "complaint": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "compliment": return <ThumbsUp className="h-4 w-4" />
      case "suggestion": return <Lightbulb className="h-4 w-4" />
      case "concern": return <AlertTriangle className="h-4 w-4" />
      case "complaint": return <AlertCircle className="h-4 w-4" />
      default: return <HelpCircle className="h-4 w-4" />
    }
  }

  const handlePageChange = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const renderPaginationItems = () => {
    if (!pagination) return []
    const items = []
    const { totalPages } = pagination

    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(currentPage - 1)}
          className={!pagination.hasPrevPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    )

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`cursor-pointer ${currentPage === i ? "bg-primary text-white hover:bg-[#7AB82F] hover:text-white border-0" : ""}`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }

    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => handlePageChange(currentPage + 1)}
          className={!pagination.hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    )

    return items
  }

  const handleViewFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback)
    setIsViewModalOpen(true)
  }

  const handleEditFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (feedback: Feedback) => {
    setFeedbackToDelete(feedback)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!feedbackToDelete) return
    try {
      const response = await fetch(`/api/admin/feedback?id=${feedbackToDelete._id}`, { method: "DELETE" })
      const result = await response.json()
      if (result.success) {
        mutate()
        toast({ title: "Deleted", description: "Feedback has been deleted." })
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Failed to delete feedback.", variant: "destructive" })
    } finally {
      setIsDeleteModalOpen(false)
      setFeedbackToDelete(null)
    }
  }

  const handleUpdateFeedback = async () => {
    if (!selectedFeedback) return
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/feedback", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: selectedFeedback._id,
          status: selectedFeedback.status,
          adminNotes: selectedFeedback.adminNotes,
        }),
      })
      const result = await response.json()
      if (result.success) {
        mutate()
        setIsEditModalOpen(false)
        toast({ title: "Updated", description: "Feedback has been updated." })
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Failed to update feedback.", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const statCards = [
    { title: "Total Feedback", value: stats?.total || 0, icon: MessageSquare, color: "text-secondary" },
    { title: "New", value: stats?.new || 0, icon: AlertCircle, color: "text-secondary" },
    { title: "Resolved", value: stats?.resolved || 0, icon: ThumbsUp, color: "text-secondary" },
    { title: "Complaints", value: stats?.complaints || 0, icon: AlertTriangle, color: "text-secondary" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary">Feedback Manager</h1>
        <p className="text-gray-600 mt-1">Manage customer feedback and complaints</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-1 text-secondary">{stat.value}</h3>
                </div>
                <div className={stat.color}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email or feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[160px]">
                  <MessageSquare className="h-4 w-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="compliment">Compliment</SelectItem>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="concern">Concern</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-linear-to-r from-secondary/10 to-primary/10 p-4 border-b">
          <CardTitle className="flex items-center gap-2 text-secondary">
            <MessageSquare className="h-5 w-5 text-primary" />
            Feedback List
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-secondary">From</TableHead>
                  <TableHead className="font-semibold text-secondary">Type</TableHead>
                  <TableHead className="font-semibold text-secondary">Feedback</TableHead>
                  <TableHead className="font-semibold text-secondary">Status</TableHead>
                  <TableHead className="font-semibold text-secondary">Date</TableHead>
                  <TableHead className="text-right font-semibold text-secondary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-48 text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                      <p className="text-gray-500">Loading feedback...</p>
                    </TableCell>
                  </TableRow>
                ) : feedbacks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-48 text-center text-gray-500">
                      No feedback found.
                    </TableCell>
                  </TableRow>
                ) : (
                  feedbacks.map((fb) => (
                    <TableRow key={fb._id} className="hover:bg-gray-50">
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-secondary">
                            {fb.isAnonymous ? "Anonymous" : fb.name || "No Name"}
                          </span>
                          {!fb.isAnonymous && fb.email && (
                            <span className="text-xs text-gray-500">{fb.email}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge className={`${getTypeColor(fb.feedbackType)} border-0 flex items-center gap-1 w-fit`}>
                          {getTypeIcon(fb.feedbackType)}
                          {fb.feedbackType.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 max-w-xs">
                        <p className="text-gray-700 truncate">{fb.feedback}</p>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge className={`${getStatusColor(fb.status)} border-0`}>
                          {fb.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-sm text-gray-600">
                        {formatDate(fb.submittedAt)}
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleViewFeedback(fb)} className="h-8 w-8 text-secondary hover:text-blue-700 hover:bg-blue-50">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditFeedback(fb)} className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(fb)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {pagination && pagination.totalPages > 1 && (
            <div className="p-4 border-t flex justify-center">
              <Pagination>
                <PaginationContent>{renderPaginationItems()}</PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Feedback Details</DialogTitle>
          </DialogHeader>
          {selectedFeedback && (
            <>
              {/* Header */}
              <div className="bg-secondary p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedFeedback.isAnonymous ? "Anonymous" : selectedFeedback.name || "No Name"}
                      </h2>
                      {!selectedFeedback.isAnonymous && selectedFeedback.email && (
                        <div className="flex items-center gap-2 mt-1 text-white/80 text-sm">
                          <Mail className="h-4 w-4" />
                          {selectedFeedback.email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className={`${getTypeColor(selectedFeedback.feedbackType)} border-0`}>
                    {getTypeIcon(selectedFeedback.feedbackType)}
                    <span className="ml-1">{selectedFeedback.feedbackType.toUpperCase()}</span>
                  </Badge>
                  <Badge className={`${getStatusColor(selectedFeedback.status)} border-0`}>
                    {selectedFeedback.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Contact Info */}
                {!selectedFeedback.isAnonymous && (selectedFeedback.email || selectedFeedback.phone) && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Contact Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {selectedFeedback.name && (
                        <div>
                          <p className="text-xs text-gray-500">Name</p>
                          <p className="font-semibold text-secondary">{selectedFeedback.name}</p>
                        </div>
                      )}
                      {selectedFeedback.email && (
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-medium text-secondary">{selectedFeedback.email}</p>
                        </div>
                      )}
                      {selectedFeedback.phone && (
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-medium text-secondary">{selectedFeedback.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Feedback Message */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Feedback Message
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedFeedback.feedback}
                    </p>
                  </div>
                </div>

                {/* Resolution Request */}
                {selectedFeedback.resolution && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Resolution Request
                    </h3>
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                      <p className="text-amber-900 leading-relaxed whitespace-pre-wrap">
                        {selectedFeedback.resolution}
                      </p>
                    </div>
                  </div>
                )}

                {/* Admin Notes */}
                {selectedFeedback.adminNotes && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Admin Notes
                    </h3>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <p className="text-blue-900 leading-relaxed whitespace-pre-wrap">
                        {selectedFeedback.adminNotes}
                      </p>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Submitted On
                    </div>
                    <p className="font-medium text-secondary">
                      {new Date(selectedFeedback.submittedAt).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <Clock className="h-3.5 w-3.5" />
                      Last Updated
                    </div>
                    <p className="font-medium text-secondary">
                      {new Date(selectedFeedback.lastUpdated).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                {!selectedFeedback.isAnonymous && (selectedFeedback.email || selectedFeedback.phone) && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Quick Actions
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedFeedback.email && (
                        <Button
                          onClick={() => window.open(`mailto:${selectedFeedback.email}`)}
                          className="bg-secondary hover:bg-secondary-hover text-white"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </Button>
                      )}
                      {selectedFeedback.phone && (
                        <Button
                          onClick={() => window.open(`tel:${selectedFeedback.phone}`)}
                          variant="outline"
                          className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-secondary flex items-center gap-2">
              <Edit className="h-6 w-6 text-primary" />
              Update Feedback Status & Details
            </DialogTitle>
            <p className="text-gray-600 text-sm mt-2">
              Customer feedback is read-only. You can only update administrative fields.
            </p>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-6 py-4">
              {/* Read-only Feedback Information */}
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-secondary" />
                  Feedback Information (Read-only)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">From</Label>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedFeedback.isAnonymous ? "Anonymous" : selectedFeedback.name || "No Name"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Type</Label>
                    <Badge className={`${getTypeColor(selectedFeedback.feedbackType)} border-0 mt-1`}>
                      {selectedFeedback.feedbackType.toUpperCase()}
                    </Badge>
                  </div>
                  {!selectedFeedback.isAnonymous && selectedFeedback.email && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Email</Label>
                      <p className="text-gray-900">{selectedFeedback.email}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Submitted On</Label>
                    <p className="text-gray-900">{formatDate(selectedFeedback.submittedAt)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="text-sm font-medium text-gray-600">Feedback Message</Label>
                  <p className="mt-1 p-3 bg-white rounded border text-gray-900 line-clamp-4">
                    {selectedFeedback.feedback}
                  </p>
                </div>
                {selectedFeedback.resolution && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-gray-600">Resolution Request</Label>
                    <p className="mt-1 p-3 bg-amber-50 rounded border border-amber-100 text-amber-900 line-clamp-3">
                      {selectedFeedback.resolution}
                    </p>
                  </div>
                )}
              </div>

              {/* Editable Administrative Fields */}
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Edit className="h-5 w-5 text-primary" />
                  Administrative Details (Editable)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Feedback Status</Label>
                    <Select
                      value={selectedFeedback.status}
                      onValueChange={(value: any) => setSelectedFeedback({ ...selectedFeedback, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <Label className="text-sm font-medium">Admin Notes & Follow-up Details</Label>
                  <Textarea
                    value={selectedFeedback.adminNotes || ""}
                    onChange={(e) => setSelectedFeedback({ ...selectedFeedback, adminNotes: e.target.value })}
                    placeholder="Add internal notes, follow-up details, resolution actions, etc."
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleUpdateFeedback} disabled={isSaving} className="bg-primary hover:bg-[#7AB82F] text-white min-w-[140px]">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Feedback
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Feedback?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this feedback. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
