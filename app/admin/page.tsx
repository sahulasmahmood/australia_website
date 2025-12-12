"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Briefcase, 
  Heart, 
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Services",
      value: "12",
      change: "+2 this month",
      icon: <Briefcase className="h-6 w-6" />,
      color: "text-[#8CC63F]",
      bgColor: "bg-[#F0F9E8]",
    },
    {
      title: "Support Workers",
      value: "24",
      change: "+5 this month",
      icon: <Users className="h-6 w-6" />,
      color: "text-[#1E3A5F]",
      bgColor: "bg-blue-50",
    },
    {
      title: "Testimonials",
      value: "48",
      change: "+8 this month",
      icon: <Heart className="h-6 w-6" />,
      color: "text-[#8CC63F]",
      bgColor: "bg-[#F0F9E8]",
    },
    {
      title: "Inquiries",
      value: "15",
      change: "3 pending",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "text-[#1E3A5F]",
      bgColor: "bg-blue-50",
    },
  ]

  const recentActivities = [
    { title: "New inquiry received", time: "2 hours ago", status: "new" },
    { title: "Service updated", time: "5 hours ago", status: "completed" },
    { title: "New testimonial added", time: "1 day ago", status: "completed" },
    { title: "Worker profile updated", time: "2 days ago", status: "completed" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#8CC63F] to-[#7AB82F] rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome to Elegant Care Service!</h1>
        <p className="text-white/90">Manage your care services, support workers, and client inquiries.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <Badge variant="secondary" className="bg-[#F0F9E8] text-[#8CC63F]">
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-[#1E3A5F]">{stat.value}</p>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader className="bg-[#F0F9E8]">
            <CardTitle className="flex items-center gap-2 text-[#1E3A5F]">
              <TrendingUp className="h-5 w-5 text-[#8CC63F]" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === "new" ? "bg-[#8CC63F]" : "bg-gray-300"
                  }`}>
                    {activity.status === "new" ? (
                      <Clock className="h-5 w-5 text-white" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1E3A5F]">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <Badge
                    variant={activity.status === "new" ? "default" : "secondary"}
                    className={activity.status === "new" ? "bg-[#8CC63F] text-white" : ""}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="bg-[#F0F9E8]">
            <CardTitle className="flex items-center gap-2 text-[#1E3A5F]">
              <Briefcase className="h-5 w-5 text-[#8CC63F]" />
              Quick Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[#F0F9E8] rounded-lg">
                  <p className="text-2xl font-bold text-[#8CC63F]">95%</p>
                  <p className="text-sm text-gray-600">Client Satisfaction</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-[#1E3A5F]">24/7</p>
                  <p className="text-sm text-gray-600">Support Available</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[#F0F9E8] rounded-lg">
                  <p className="text-2xl font-bold text-[#8CC63F]">150+</p>
                  <p className="text-sm text-gray-600">Active Clients</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-[#1E3A5F]">8+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
