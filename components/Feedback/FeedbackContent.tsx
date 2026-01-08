"use client"

import { useState } from "react"
import { Loader2, ChevronDown, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const feedbackTypes = [
  { value: "compliment", label: "Compliment" },
  { value: "suggestion", label: "Suggestion" },
  { value: "concern", label: "Concern" },
  { value: "complaint", label: "Complaint" },
  { value: "other", label: "Other" },
]

export function FeedbackContent() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    feedbackType: "other",
    feedback: "",
    resolution: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.feedback) {
      toast({
        variant: "destructive",
        title: "Required Field",
        description: "Please enter your feedback message.",
      })
      return
    }

    if (!isAnonymous && !formData.name) {
      toast({
        variant: "destructive",
        title: "Required Field",
        description: "Please enter your name or choose anonymous feedback.",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isAnonymous,
          name: isAnonymous ? "" : formData.name,
          email: isAnonymous ? "" : formData.email,
          phone: isAnonymous ? "" : formData.phone,
          feedbackType: formData.feedbackType,
          feedback: formData.feedback,
          resolution: formData.resolution,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Feedback Submitted!",
          description: data.message || "Thank you for your feedback. We appreciate your input.",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          feedbackType: "other",
          feedback: "",
          resolution: "",
        })
        setIsAnonymous(false)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Failed to submit feedback",
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const selectedTypeLabel = feedbackTypes.find(t => t.value === formData.feedbackType)?.label || "Select type"

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-secondary">WE VALUE YOUR </span>
            <span className="text-primary">FEEDBACK</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-justify">
            Your feedback helps us improve our services and provide better care for you and your loved ones.
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Anonymous Option - Custom Radio Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-sm font-medium text-secondary">
              Would you like your feedback to be anonymous?
            </span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div 
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isAnonymous 
                      ? "border-primary bg-primary" 
                      : "border-gray-300 group-hover:border-primary"
                  }`}
                  onClick={() => !loading && setIsAnonymous(true)}
                >
                  {isAnonymous && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <div 
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    !isAnonymous 
                      ? "border-primary bg-primary" 
                      : "border-gray-300 group-hover:border-primary"
                  }`}
                  onClick={() => !loading && setIsAnonymous(false)}
                >
                  {!isAnonymous && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                  Name {!isAnonymous && "*"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading || isAnonymous}
                  required={!isAnonymous}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading || isAnonymous}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading || isAnonymous}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:bg-gray-100"
                />
              </div>

              {/* Custom Dropdown for Feedback Type */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Feedback Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => !loading && setIsDropdownOpen(!isDropdownOpen)}
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white disabled:opacity-50 text-left flex items-center justify-between"
                  >
                    <span className="text-gray-900">{selectedTypeLabel}</span>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-secondary [&::-webkit-scrollbar-thumb]:rounded-full">
                        {feedbackTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, feedbackType: type.value })
                              setIsDropdownOpen(false)
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-primary/10 flex items-center justify-between transition-colors text-sm"
                          >
                            <span className="text-gray-700">{type.label}</span>
                            {formData.feedbackType === type.value && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Feedback Content */}
            <div className="space-y-6">
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-secondary mb-2">
                  What would you like to tell us? *
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={5}
                  required
                  placeholder="Please share your feedback in detail..."
                  value={formData.feedback}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="resolution" className="block text-sm font-medium text-secondary mb-2">
                  If you are making a complaint, how would you like us to address the problem?
                </label>
                <textarea
                  id="resolution"
                  name="resolution"
                  rows={5}
                  placeholder="Tell us how you would like us to resolve this issue..."
                  value={formData.resolution}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-semibold px-8 py-3 rounded hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Message
                  <span className="ml-1">▶</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
