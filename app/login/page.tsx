"use client"

import { useState, useEffect } from "react"
import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (token) {
      axios.get("/api/admin/auth/verify", {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
      .then((response) => {
        if (response.data.success) {
          router.push("/admin")
        } else {
          localStorage.removeItem("admin_token")
        }
      })
      .catch(() => {
        localStorage.removeItem("admin_token")
      })
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Email and password are required.",
        duration: 3000,
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        duration: 3000,
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post("/api/admin/auth/login", formData)
      const { token, admin } = response.data
      
      if (!token || !admin) {
        throw new Error("Invalid response from server")
      }
      
      localStorage.setItem("admin_token", token)
      
      toast({
        variant: "default",
        title: "Welcome Back!",
        description: `Successfully logged in as ${admin.firstName}`,
        duration: 3000,
      })

      setTimeout(() => {
        router.push("/admin")
      }, 1000)
    } catch (error: any) {
      let errorMessage = "An error occurred during login. Please try again."
      let errorTitle = "Login Failed"
      
      if (error.response?.status === 401) {
        errorTitle = "Invalid Credentials"
        errorMessage = "The email or password you entered is incorrect."
      } else if (error.response?.status === 403) {
        errorTitle = "Account Inactive"
        errorMessage = "Your account has been deactivated. Please contact support."
      }
      
      toast({
        variant: "destructive",
        title: errorTitle,
        description: error.response?.data?.error || errorMessage,
        duration: 4000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <TopBar />
      <Header />

      <section className="flex-1 flex items-center justify-center py-12 sm:py-16 bg-[#F5F5F5]">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>

            <h1 className="text-2xl font-bold text-center text-[#1E3A5F] mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-center text-sm mb-8">Sign in to access your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-[#1E3A5F]">
                    Password
                  </label>
                  <Link href="/login/forgot-password" className="text-sm text-[#8CC63F] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all disabled:opacity-50"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#8CC63F] text-white font-medium py-3 rounded hover:bg-[#7AB82F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                disabled={isLoading}
                className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            © {new Date().getFullYear()} Elegant Care Service. All rights reserved.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
