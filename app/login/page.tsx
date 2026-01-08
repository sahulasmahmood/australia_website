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
import { GoogleSignInButton } from "@/components/ui/google-sign-in-button"

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
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid response from server",
        })
        return
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

      <section className="flex-1 flex items-center justify-center py-12 sm:py-16 bg-light-gray">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>

            <h1 className="text-2xl font-bold text-center text-secondary mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-center text-sm mb-8">Sign in to access your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-secondary">
                    Password
                  </label>
                  <Link href="/login/forgot-password" className="text-sm text-primary hover:underline">
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
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50"
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
                className="w-full bg-primary text-white font-medium py-3 rounded hover:bg-[#7AB82F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

              <div className="mt-4">
                <GoogleSignInButton />
              </div>
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
