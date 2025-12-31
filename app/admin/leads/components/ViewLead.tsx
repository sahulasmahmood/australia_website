"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  MapPin,
  Globe,
  TrendingUp,
  Activity,
  Copy,
  ExternalLink,
  X,
  Star,
  Target
} from "lucide-react"
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon"
import { Lead } from "@/hooks/use-leads"

interface ViewLeadProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
}

export default function ViewLead({ lead, isOpen, onClose }: ViewLeadProps) {
  if (!lead) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4" />
      case "contacted":
        return <Clock className="h-4 w-4" />
      case "consulting":
        return <Activity className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <X className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusGradient = (status: string) => {
    switch (status) {
      case "new":
        return "from-blue-500 to-cyan-500"
      case "contacted":
        return "from-yellow-500 to-orange-500"
      case "consulting":
        return "from-purple-500 to-indigo-500"
      case "confirmed":
        return "from-green-500 to-emerald-500"
      case "completed":
        return "from-green-600 to-green-800 shadow-green-200"
      case "cancelled":
        return "from-gray-500 to-slate-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  const getPriorityGradient = (priority: string) => {
    switch (priority) {
      case "high":
        return "from-red-500 to-rose-500"
      case "medium":
        return "from-orange-500 to-amber-500"
      case "low":
        return "from-green-500 to-teal-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-white shadow-2xl rounded-2xl border-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Lead Details for {lead.firstName} {lead.lastName}</DialogTitle>
        </DialogHeader>
        
        {/* Header Section */}
        <div className="relative bg-[#1E3A5F] p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{lead.firstName} {lead.lastName}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-white/70 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    <span>{lead.email}</span>
                  </div>
                  {lead.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-4 w-4" />
                      <span>{lead.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getStatusGradient(lead.status)} text-white text-xs font-semibold flex items-center gap-2 shadow-lg`}>
                {getStatusIcon(lead.status)}
                {lead.status.toUpperCase()}
              </div>
              <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getPriorityGradient(lead.priority)} text-white text-xs font-semibold flex items-center gap-2 shadow-lg`}>
                <TrendingUp className="h-4 w-4" />
                {lead.priority.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Main Info */}
          <div className="lg:col-span-2 p-8 space-y-8">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#8CC63F]" />
                Enquiry Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Subject</label>
                  <p className="text-lg font-semibold text-[#1E3A5F]">{lead.subject}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <label className="text-sm font-medium text-gray-400 block mb-2">Message</label>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                </div>
              </div>
            </section>

            {lead.notes && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#8CC63F]" />
                  Internal Notes
                </h3>
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 italic text-amber-900 leading-relaxed">
                  {lead.notes}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="bg-gray-50/50 p-8 border-l border-gray-100 space-y-8">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Meta Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Source</span>
                  <Badge variant="outline" className="bg-white">{lead.source}</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Submitted</span>
                  <span className="font-medium text-gray-700">{new Date(lead.submittedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Last Active</span>
                  <span className="font-medium text-gray-700">{new Date(lead.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </section>

            <section className="space-y-3 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Quick Actions</h3>
              <Button 
                onClick={() => window.open(`mailto:${lead.email}`)}
                className="w-full bg-white text-[#1E3A5F] border border-gray-200 hover:bg-gray-100 justify-start h-12 rounded-xl transition-all"
              >
                <Mail className="h-4 w-4 mr-3 text-[#1E3A5F]" />
                Send Email
              </Button>
              {lead.phone && (
                <>
                  <Button 
                    onClick={() => window.open(`tel:${lead.phone}`)}
                    className="w-full bg-white text-[#1E3A5F] border border-gray-200 hover:bg-gray-100 justify-start h-12 rounded-xl transition-all"
                  >
                    <Phone className="h-4 w-4 mr-3 text-[#1E3A5F]" />
                    Call Customer
                  </Button>
                  <Button 
                    onClick={() => window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`)}
                    className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] justify-start h-12 rounded-xl transition-all shadow-md shadow-green-100"
                  >
                    <WhatsAppIcon className="h-4 w-4 mr-3" />
                    WhatsApp
                  </Button>
                  {lead.status === "completed" && lead.reviewLink && (
                    <Button 
                      onClick={() => {
                        const message = `Hi ${lead.firstName}, thank you for choosing Elegant Care. Please leave us a review: ${lead.reviewLink}`;
                        window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`);
                      }}
                      className="w-full bg-amber-500 text-white hover:bg-amber-600 justify-start h-12 rounded-xl transition-all shadow-md shadow-amber-100"
                    >
                      <Star className="h-4 w-4 mr-3" />
                      Share Review Link
                    </Button>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
