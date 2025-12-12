import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <TopBar />
      <Header />

      <section className="flex-1 flex items-center justify-center py-12 sm:py-16 bg-[#F5F5F5]">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-32">
                <Logo size="sm" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-[#1E3A5F] mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-center text-sm mb-8">Sign in to access your account</p>

            <form className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-[#1E3A5F]">
                    Password
                  </label>
                  <a href="#" className="text-sm text-[#8CC63F] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" name="remember" className="w-4 h-4 accent-[#8CC63F]" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8CC63F] text-white font-medium py-3 rounded hover:bg-[#7AB82F] transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/contact" className="text-[#8CC63F] font-medium hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-[#8CC63F] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#8CC63F] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
