"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Phone } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useServices } from "@/hooks/use-services"
import { useSupportModels } from "@/hooks/use-support-models"
import { useContact } from "@/hooks/use-contact"

const staticNavItems = [
  { label: "HOME", href: "/" },
  {
    label: "ABOUT US",
    href: "/about",
    dropdown: [
      { label: "Our Story", href: "/about" },
      { label: "Our Mission", href: "/about#mission" },
      { label: "Our Team", href: "/about/team" },
    ],
  },
  { label: "NDIS", href: "/ndis" },
  { label: "FEEDBACK", href: "/feedback" },
  { label: "CONTACT", href: "/contact" },
]

export function Header() {
  const { services, isLoading: servicesLoading } = useServices(1, 50)
  const { supportModels, isLoading: supportModelsLoading } = useSupportModels(1, 50)
  const { contactInfo } = useContact()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  
  // Build dynamic services dropdown
  const servicesDropdown = services.map(service => ({
    label: service.serviceName,
    href: `/services/${service.slug}`,
  }))
  
  // Build dynamic support models dropdown
  const supportModelsDropdown = supportModels.map(model => ({
    label: model.title,
    href: `/support-model/${model.slug}`,
  }))
  
  // Combine static nav items with dynamic services and support models
  const navItems = [
    staticNavItems[0], // HOME
    staticNavItems[1], // ABOUT US
    {
      label: "SERVICES",
      href: "/services",
      dropdown: servicesDropdown.length > 0 ? servicesDropdown : undefined,
    },
    {
      label: "SUPPORT MODEL",
      href: "/support-model",
      dropdown: supportModelsDropdown.length > 0 ? supportModelsDropdown : undefined,
    },
    ...staticNavItems.slice(2), // Rest of the items
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
        setExpandedItems([])
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const toggleDropdown = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-dark hover:text-primary transition-colors group">
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg min-w-[240px] max-w-[280px] p-1">
                    {item.label === "SERVICES" && servicesLoading ? (
                      <div className="px-3 py-2 text-sm text-gray-500 text-center">
                        Loading services...
                      </div>
                    ) : item.label === "SERVICES" && servicesDropdown.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-gray-500 text-center">
                        No services available
                      </div>
                    ) : item.label === "SUPPORT MODEL" && supportModelsLoading ? (
                      <div className="px-3 py-2 text-sm text-gray-500 text-center">
                        Loading support models...
                      </div>
                    ) : item.label === "SUPPORT MODEL" && supportModelsDropdown.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-gray-500 text-center">
                        No support models available
                      </div>
                    ) : (
                      <>
                        {item.label === "SERVICES" && (
                          <DropdownMenuItem asChild>
                            <Link 
                              href="/services" 
                              className="cursor-pointer hover:bg-primary/10 hover:text-primary rounded-md px-3 py-1.5 font-semibold text-secondary border-b border-gray-100 mb-0.5 text-sm"
                            >
                              View All Services
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {item.label === "SUPPORT MODEL" && (
                          <DropdownMenuItem asChild>
                            <Link 
                              href="/support-model" 
                              className="cursor-pointer hover:bg-primary/10 hover:text-primary rounded-md px-3 py-1.5 font-semibold text-secondary border-b border-gray-100 mb-0.5 text-sm"
                            >
                              View All Support Models
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {item.dropdown.map((subItem) => (
                          <DropdownMenuItem key={`${item.label}-${subItem.href}`} asChild>
                            <Link 
                              href={subItem.href} 
                              className="cursor-pointer hover:bg-primary/10 hover:text-primary rounded-md px-3 py-1.5 text-sm transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-text-dark hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link href="/login">
              <Button className="ml-4 bg-primary hover:bg-primary-hover text-white font-medium">LOGIN</Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            {contactInfo?.primaryPhone && (
              <a 
                href={`tel:${contactInfo.primaryPhone.replace(/[^0-9+]/g, '')}`} 
                className="p-2 text-primary sm:hidden" 
                aria-label="Call us"
              >
                <Phone className="h-5 w-5" />
              </a>
            )}
            <button
              className="p-2 text-text-dark hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <nav className="absolute top-0 left-0 right-0 bg-white max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto shadow-xl">
            <div className="flex flex-col py-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-gray-100 last:border-b-0">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-text-dark hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expandedItems.includes(item.label) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {expandedItems.includes(item.label) && (
                        <div className="bg-gray-50 py-1">
                          {item.label === "SERVICES" && servicesLoading ? (
                            <div className="px-10 py-2 text-sm text-gray-500">
                              Loading services...
                            </div>
                          ) : item.label === "SERVICES" && servicesDropdown.length === 0 ? (
                            <div className="px-10 py-2 text-sm text-gray-500">
                              No services available
                            </div>
                          ) : item.label === "SUPPORT MODEL" && supportModelsLoading ? (
                            <div className="px-10 py-2 text-sm text-gray-500">
                              Loading support models...
                            </div>
                          ) : item.label === "SUPPORT MODEL" && supportModelsDropdown.length === 0 ? (
                            <div className="px-10 py-2 text-sm text-gray-500">
                              No support models available
                            </div>
                          ) : (
                            <>
                              {item.label === "SERVICES" && (
                                <Link
                                  href="/services"
                                  className="block px-10 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-gray-100 transition-colors border-b border-gray-200 mb-0.5"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  View All Services
                                </Link>
                              )}
                              {item.label === "SUPPORT MODEL" && (
                                <Link
                                  href="/support-model"
                                  className="block px-10 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-gray-100 transition-colors border-b border-gray-200 mb-0.5"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  View All Support Models
                                </Link>
                              )}
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={`${item.label}-mobile-${subItem.href}`}
                                  href={subItem.href}
                                  className="block px-10 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-6 py-4 text-sm font-medium text-text-dark hover:text-primary hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="px-6 py-6 bg-gray-50 mt-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3">LOGIN</Button>
                </Link>
                {contactInfo?.primaryPhone && (
                  <a
                    href={`tel:${contactInfo.primaryPhone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center justify-center gap-2 mt-4 text-secondary font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    {contactInfo.primaryPhone}
                  </a>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
