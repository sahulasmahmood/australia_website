import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { PageBanner } from "@/components/page-banner"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <PageBanner
        title="CONTACT US"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                <span className="text-[#1E3A5F]">GET IN </span>
                <span className="text-[#8CC63F]">TOUCH</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Have a question or want to learn more about our services? Fill out the form below and we'll get back to
                you as soon as possible.
              </p>

              <form className="space-y-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#8CC63F] text-white font-medium px-8 py-3 rounded hover:bg-[#7AB82F] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-[#F5F5F5] rounded-lg p-6 sm:p-8 mb-8">
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#8CC63F]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1E3A5F] mb-1">Phone</h4>
                      <a href="tel:0870060200" className="text-gray-600 hover:text-[#8CC63F] transition-colors">
                        (08) 7006 0200
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#8CC63F]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1E3A5F] mb-1">Email</h4>
                      <a
                        href="mailto:info@mysupportmyway.com.au"
                        className="text-gray-600 hover:text-[#8CC63F] transition-colors break-all"
                      >
                        info@mysupportmyway.com.au
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#8CC63F]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1E3A5F] mb-1">Address</h4>
                      <p className="text-gray-600">Adelaide, South Australia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#8CC63F]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1E3A5F] mb-1">Office Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-[#1E3A5F] rounded-lg p-6 sm:p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Service Areas</h3>
                <p className="text-white/80 mb-4">We provide services across the following regions:</p>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    "Adelaide",
                    "Adelaide Hills",
                    "Mount Barker",
                    "Riverland",
                    "Renmark",
                    "Mildura",
                    "Murray Region",
                    "Surrounding Areas",
                  ].map((area) => (
                    <li key={area} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#8CC63F] rounded-full"></span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
