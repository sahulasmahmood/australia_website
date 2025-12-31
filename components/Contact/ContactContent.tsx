"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react"
import { useContact } from "@/hooks/use-contact"
import { useToast } from "@/hooks/use-toast"

export function ContactContent() {
  const { contactInfo, isLoading } = useContact()
  const { toast } = useToast()
  const [formLoading, setFormLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Message Sent!",
          description: data.message || "Thank you for contacting us. We'll get back to you soon.",
        })
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Format phone number for display
  const formatPhone = (phone: string | undefined) => {
    if (!phone) return ""
    return phone
  }

  // Format full address
  const getFullAddress = () => {
    if (!contactInfo) return ""
    const parts = [
      contactInfo.address,
      contactInfo.city,
      contactInfo.state,
      contactInfo.postcode,
      contactInfo.country,
    ].filter(Boolean)
    return parts.join(", ")
  }

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8CC63F]"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div>
              {contactInfo?.pageTitle && (
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                  <span className="text-[#1E3A5F]">{contactInfo.pageTitle.split(" ").slice(0, 2).join(" ")} </span>
                  <span className="text-[#8CC63F]">{contactInfo.pageTitle.split(" ").slice(2).join(" ")}</span>
                </h2>
              )}
              {contactInfo?.pageDescription && (
                <p className="text-gray-600 mb-8">
                  {contactInfo.pageDescription}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={formLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={formLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={formLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={formLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all bg-white disabled:opacity-50"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Enquiry</option>
                    <option value="services">Services Information</option>
                    <option value="ndis">NDIS Support</option>
                    <option value="careers">Careers</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all resize-none disabled:opacity-50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full sm:w-auto bg-[#8CC63F] text-white font-medium px-8 py-3 rounded hover:bg-[#7AB82F] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-[#F5F5F5] rounded-lg p-6 sm:p-8 mb-8">
                {contactInfo?.officeTitle && (
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-6">
                    {contactInfo.officeTitle}
                  </h3>
                )}

                <div className="space-y-6">
                  {contactInfo?.primaryPhone && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-[#8CC63F]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E3A5F] mb-1">Phone</h4>
                        <a 
                          href={`tel:${contactInfo.primaryPhone}`} 
                          className="text-gray-600 hover:text-[#8CC63F] transition-colors block"
                        >
                          {formatPhone(contactInfo.primaryPhone)}
                        </a>
                        {contactInfo?.secondaryPhone && (
                          <a 
                            href={`tel:${contactInfo.secondaryPhone}`} 
                            className="text-gray-600 hover:text-[#8CC63F] transition-colors block"
                          >
                            {formatPhone(contactInfo.secondaryPhone)}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {contactInfo?.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-[#8CC63F]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E3A5F] mb-1">Email</h4>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-gray-600 hover:text-[#8CC63F] transition-colors break-all"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {getFullAddress() && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#8CC63F]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E3A5F] mb-1">Address</h4>
                        <p className="text-gray-600">{getFullAddress()}</p>
                      </div>
                    </div>
                  )}

                  {contactInfo?.businessHours && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-[#8CC63F]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E3A5F] mb-1">Office Hours</h4>
                        <p className="text-gray-600 whitespace-pre-line">
                          {contactInfo.businessHours}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Areas */}
              {contactInfo?.serviceAreas && (
                <div className="bg-[#1E3A5F] rounded-lg p-6 sm:p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Service Areas</h3>
                  <p className="text-white/80 mb-4">We provide services across the following regions:</p>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {contactInfo.serviceAreas.split(',').map(area => area.trim()).filter(area => area.length > 0).map((area) => (
                      <li key={area} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#8CC63F] rounded-full"></span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      {contactInfo?.mapEmbedCode && (
        <section className="bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            {contactInfo?.officeTitle && (
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-[#1E3A5F]">{contactInfo.officeTitle.split(" ").slice(0, 2).join(" ")} </span>
                  <span className="text-[#8CC63F]">{contactInfo.officeTitle.split(" ").slice(2).join(" ")}</span>
                </h2>
                {contactInfo?.officeDescription && (
                  <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
                    {contactInfo.officeDescription}
                  </p>
                )}
              </div>
            )}
            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <div 
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                dangerouslySetInnerHTML={{ __html: contactInfo.mapEmbedCode }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
