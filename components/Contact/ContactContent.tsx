"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Loader2, ChevronDown, Check } from "lucide-react"
import { useContact } from "@/hooks/use-contact"
import { useServices } from "@/hooks/use-services"
import { useSupportModels } from "@/hooks/use-support-models"
import { useToast } from "@/hooks/use-toast"

export function ContactContent() {
  const { contactInfo, isLoading } = useContact()
  const { services } = useServices()
  const { supportModels } = useSupportModels()
  const { toast } = useToast()
  const [formLoading, setFormLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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
    
    // Validate subject field
    if (!formData.subject) {
      toast({
        variant: "destructive",
        title: "Required Field",
        description: "Please select a service or subject.",
      })
      return
    }
    
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
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Failed to send message",
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
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
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form Skeleton */}
            <div className="space-y-6">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-12 w-full bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-12 w-full bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-full bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-full bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-full bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-32 w-full bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="h-12 w-full bg-primary/30 rounded animate-pulse" />
            </div>
            {/* Contact Info Skeleton */}
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
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
                  <span className="text-secondary">{contactInfo.pageTitle.split(" ").slice(0, 2).join(" ")} </span>
                  <span className="text-primary">{contactInfo.pageTitle.split(" ").slice(2).join(" ")}</span>
                </h2>
              )}
              {contactInfo?.pageDescription && (
                <p className="text-gray-600 mb-8 text-justify">
                  {contactInfo.pageDescription}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-secondary mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={formLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-secondary mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={formLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number (optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={formLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                    Service / Subject *
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => !formLoading && setIsDropdownOpen(!isDropdownOpen)}
                      disabled={formLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white disabled:opacity-50 text-left flex items-center justify-between"
                    >
                      <span className={formData.subject ? "text-gray-900" : "text-gray-500"}>
                        {formData.subject || "Select a service or subject"}
                      </span>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {isDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setIsDropdownOpen(false)}
                        />
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-secondary [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-secondary-hover">
                          {/* Services */}
                          {services.filter(s => s.serviceName).length > 0 && (
                            <>
                              <div className="px-3 py-1.5 text-[10px] font-semibold text-secondary bg-gray-50 border-b border-gray-100 uppercase tracking-wider">
                                Our Services
                              </div>
                              {services.filter(s => s.serviceName).map((service) => (
                                <button
                                  key={service._id}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, subject: service.serviceName })
                                    setIsDropdownOpen(false)
                                  }}
                                  className="w-full px-3 py-2 text-left hover:bg-primary/10 flex items-center justify-between transition-colors text-sm"
                                >
                                  <span className="text-gray-700">{service.serviceName}</span>
                                  {formData.subject === service.serviceName && (
                                    <Check className="h-3.5 w-3.5 text-primary" />
                                  )}
                                </button>
                              ))}
                            </>
                          )}
                          
                          {/* Support Models */}
                          {supportModels.filter(m => m.title).length > 0 && (
                            <>
                              <div className="px-3 py-1.5 text-[10px] font-semibold text-secondary bg-gray-50 border-b border-gray-100 border-t uppercase tracking-wider">
                                Support Models
                              </div>
                              {supportModels.filter(m => m.title).map((model) => (
                                <button
                                  key={model._id}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, subject: model.title })
                                    setIsDropdownOpen(false)
                                  }}
                                  className="w-full px-3 py-2 text-left hover:bg-primary/10 flex items-center justify-between transition-colors text-sm"
                                >
                                  <span className="text-gray-700">{model.title}</span>
                                  {formData.subject === model.title && (
                                    <Check className="h-3.5 w-3.5 text-primary" />
                                  )}
                                </button>
                              ))}
                            </>
                          )}
                          
                          {/* Other */}
                          <div className="px-3 py-1.5 text-[10px] font-semibold text-secondary bg-gray-50 border-b border-gray-100 border-t uppercase tracking-wider">
                            Other
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, subject: "Other" })
                              setIsDropdownOpen(false)
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-primary/10 flex items-center justify-between transition-colors text-sm"
                          >
                            <span className="text-gray-700">Other</span>
                            {formData.subject === "Other" && (
                              <Check className="h-3.5 w-3.5 text-primary" />
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none disabled:opacity-50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full sm:w-auto bg-primary text-white font-medium px-8 py-3 rounded hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
              <div className="bg-light-gray rounded-lg p-6 sm:p-8 mb-8">
                {contactInfo?.officeTitle && (
                  <h3 className="text-xl font-bold text-secondary mb-6">
                    {contactInfo.officeTitle}
                  </h3>
                )}

                <div className="space-y-6">
                  {contactInfo?.primaryPhone && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary mb-1">Phone</h4>
                        <a 
                          href={`tel:${contactInfo.primaryPhone}`} 
                          className="text-gray-600 hover:text-primary transition-colors block"
                        >
                          {formatPhone(contactInfo.primaryPhone)}
                        </a>
                        {contactInfo?.secondaryPhone && (
                          <a 
                            href={`tel:${contactInfo.secondaryPhone}`} 
                            className="text-gray-600 hover:text-primary transition-colors block"
                          >
                            {formatPhone(contactInfo.secondaryPhone)}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {contactInfo?.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary mb-1">Email</h4>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-gray-600 hover:text-primary transition-colors break-all"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {getFullAddress() && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary mb-1">Address</h4>
                        <p className="text-gray-600">{getFullAddress()}</p>
                      </div>
                    </div>
                  )}

                  {contactInfo?.businessHours && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary mb-1">Office Hours</h4>
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
                <div className="bg-secondary rounded-lg p-6 sm:p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Service Areas</h3>
                  <p className="text-white/80 mb-4">We provide services across the following regions:</p>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {contactInfo.serviceAreas.split(',').map(area => area.trim()).filter(area => area.length > 0).map((area) => (
                      <li key={area} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
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
        <section className="bg-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            {contactInfo?.officeTitle && (
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-secondary">{contactInfo.officeTitle.split(" ").slice(0, 2).join(" ")} </span>
                  <span className="text-primary">{contactInfo.officeTitle.split(" ").slice(2).join(" ")}</span>
                </h2>
                {contactInfo?.officeDescription && (
                  <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto text-justify">
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
