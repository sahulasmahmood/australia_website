"use client"

import { useState } from "react"
import { MessageSquare, ThumbsUp, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FeedbackContent() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "",
    service: "",
    feedback: "",
    contact: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // You can add form submission logic here
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We appreciate your input.",
      })
      setFormData({
        name: "",
        email: "",
        feedbackType: "",
        service: "",
        feedback: "",
        contact: false,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="text-[#1E3A5F]">WE VALUE </span>
            <span className="text-[#8CC63F]">YOUR FEEDBACK</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your feedback helps us improve our services and ensure we're meeting your needs. Whether it's a
            compliment, suggestion, or concern, we want to hear from you.
          </p>
        </div>

        {/* Feedback Types */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#F5F5F5] p-6 rounded-lg text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-[#8CC63F]/10 rounded-full">
              <ThumbsUp className="w-7 h-7 text-[#8CC63F]" />
            </div>
            <h3 className="font-semibold text-[#1E3A5F] mb-2">Compliments</h3>
            <p className="text-gray-600 text-sm">Let us know when we've done well!</p>
          </div>

          <div className="bg-[#F5F5F5] p-6 rounded-lg text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-[#8CC63F]/10 rounded-full">
              <MessageSquare className="w-7 h-7 text-[#8CC63F]" />
            </div>
            <h3 className="font-semibold text-[#1E3A5F] mb-2">Suggestions</h3>
            <p className="text-gray-600 text-sm">Share ideas for improvement.</p>
          </div>

          <div className="bg-[#F5F5F5] p-6 rounded-lg text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-[#8CC63F]/10 rounded-full">
              <AlertCircle className="w-7 h-7 text-[#8CC63F]" />
            </div>
            <h3 className="font-semibold text-[#1E3A5F] mb-2">Concerns</h3>
            <p className="text-gray-600 text-sm">Report any issues or concerns.</p>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-[#F5F5F5] rounded-lg p-6 sm:p-8">
          <h3 className="text-xl font-bold text-[#1E3A5F] mb-6">Submit Your Feedback</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all bg-white disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all bg-white disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="feedbackType" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Type of Feedback *
              </label>
              <select
                id="feedbackType"
                name="feedbackType"
                required
                value={formData.feedbackType}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all bg-white disabled:opacity-50"
              >
                <option value="">Select type</option>
                <option value="compliment">Compliment</option>
                <option value="suggestion">Suggestion</option>
                <option value="concern">Concern</option>
                <option value="complaint">Complaint</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Related Service (Optional)
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all bg-white disabled:opacity-50"
              >
                <option value="">Select service</option>
                <option value="sil">Supported Independent Living</option>
                <option value="respite">Respite Support</option>
                <option value="community">Community Participation</option>
                <option value="daily-living">Assistance with Daily Living</option>
                <option value="transport">Transport Support</option>
                <option value="behaviour">Behaviour Support</option>
                <option value="general">General / Not Specific</option>
              </select>
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Your Feedback *
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows={6}
                required
                value={formData.feedback}
                onChange={handleChange}
                disabled={loading}
                placeholder="Please share your feedback in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all resize-none bg-white disabled:opacity-50"
              ></textarea>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="contact"
                name="contact"
                checked={formData.contact}
                onChange={handleChange}
                disabled={loading}
                className="mt-1 w-4 h-4 accent-[#8CC63F] disabled:opacity-50"
              />
              <label htmlFor="contact" className="text-sm text-gray-600">
                I would like to be contacted regarding this feedback
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#8CC63F] text-white font-medium px-8 py-3 rounded hover:bg-[#7AB82F] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </form>
        </div>

        {/* Alternative Contact */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Prefer to speak with someone directly? Call us at{" "}
            <a href="tel:0870060200" className="text-[#8CC63F] font-medium hover:underline">
              (08) 7006 0200
            </a>{" "}
            or email{" "}
            <a href="mailto:info@mysupportmyway.com.au" className="text-[#8CC63F] font-medium hover:underline">
              info@mysupportmyway.com.au
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
