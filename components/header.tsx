"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Phone } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
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
  {
    label: "SERVICES",
    href: "/services",
    dropdown: [
      { label: "Supported Independent Living", href: "/services/supported-living" },
      { label: "Respite Support", href: "/services/respite-support" },
      { label: "Community Participation", href: "/services/community-participation" },
      { label: "Daily Living Assistance", href: "/services/daily-living" },
      { label: "Transport Support", href: "/services/transport" },
      { label: "Behaviour Support", href: "/services/behaviour-support" },
    ],
  },
  {
    label: "SUPPORT MODEL",
    href: "/support-model",
    dropdown: [
      { label: "How We Work", href: "/support-model" },
      { label: "Our Approach", href: "/support-model#approach" },
    ],
  },
  { label: "NDIS", href: "/ndis" },
  { label: "FEEDBACK", href: "/feedback" },
  { label: "CONTACT", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

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
                  <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#333] hover:text-[#8CC63F] transition-colors">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-200">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.label} asChild>
                        <Link href={subItem.href} className="cursor-pointer hover:bg-gray-50 hover:text-[#8CC63F]">
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-[#333] hover:text-[#8CC63F] transition-colors"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link href="/login">
              <Button className="ml-4 bg-[#8CC63F] hover:bg-[#7AB82F] text-white font-medium">LOGIN</Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <a href="tel:0870060200" className="p-2 text-[#8CC63F] sm:hidden" aria-label="Call us">
              <Phone className="h-5 w-5" />
            </a>
            <button
              className="p-2 text-[#333] hover:bg-gray-100 rounded-md transition-colors"
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
                        className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-[#333] hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expandedItems.includes(item.label) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {expandedItems.includes(item.label) && (
                        <div className="bg-gray-50 py-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-10 py-3 text-sm text-gray-600 hover:text-[#8CC63F] hover:bg-gray-100 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-6 py-4 text-sm font-medium text-[#333] hover:text-[#8CC63F] hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="px-6 py-6 bg-gray-50 mt-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#8CC63F] hover:bg-[#7AB82F] text-white font-medium py-3">LOGIN</Button>
                </Link>
                <a
                  href="tel:0870060200"
                  className="flex items-center justify-center gap-2 mt-4 text-[#1E3A5F] font-medium"
                >
                  <Phone className="h-4 w-4" />
                  (08) 7006 0200
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
