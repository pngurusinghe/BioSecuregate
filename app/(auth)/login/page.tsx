"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { AlertCircle, Loader2, Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { setStoredUser, generateUserId, validateAdminLogin, setAdmin } from "@/lib/auth"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginInput = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLogin = async (data: LoginInput) => {
    try {
      setError(null)

      const isAdminLogin = validateAdminLogin(data.email, data.password)

      // ✅ Always set admin flag (true/false) so it never "sticks" after admin login
      setAdmin(isAdminLogin)

      const user = {
        id: generateUserId(),
        email: data.email,
        name: isAdminLogin ? "Admin" : "User",
        isAdmin: isAdminLogin,
      }

      setStoredUser(user)

      // ✅ Route to correct dashboard
      router.push(isAdminLogin ? "/dashboard/admin" : "/dashboard")
    } catch (err) {
      setError("Failed to login. Please try again.")
    }
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@biosecuregate.com"
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Admin@123"

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <span className="font-semibold text-lg">BioSecureGate</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md bg-card/50 border-border">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                <Lock className="w-6 h-6 text-accent" />
              </div>
            </div>

            <div className="space-y-2 mb-6 text-center">
              <h1 className="text-2xl font-bold">Login</h1>
              <p className="text-sm text-muted-foreground">
                Admins: Use admin credentials. Users: Any email + password.
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...form.register("email")}
                  className="bg-input border-border"
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••"
                  {...form.register("password")}
                  className="bg-input border-border"
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-secondary/30 border border-border rounded-lg">
              <p className="text-xs font-mono text-muted-foreground">
                <strong>Admin Demo:</strong>
                <br />
                Email: {adminEmail}
                <br />
                Password: {adminPassword}
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
