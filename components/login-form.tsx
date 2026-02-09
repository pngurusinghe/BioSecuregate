"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Lock, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { setStoredUser, generateUserId, validateAdminLogin, setAdmin } from "@/lib/auth"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginInput = z.infer<typeof loginSchema>

export function LoginForm() {
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

      const user = {
        id: generateUserId(),
        email: data.email,
        name: isAdminLogin ? "Admin" : "User",
        isAdmin: isAdminLogin,
      }

      setStoredUser(user)
      if (isAdminLogin) {
        setAdmin(true)
      }

      router.push("/dashboard")
    } catch (err) {
      setError("Failed to login. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md glassmorphism neon-border">
      <div className="p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="w-10 h-10 rounded-lg glassmorphism border border-accent/50 flex items-center justify-center shadow-lg shadow-accent/20">
            <Lock className="w-6 h-6 text-accent" />
          </div>
        </div>

        <div className="space-y-2 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <h1 className="text-2xl font-bold">BioSecureGate</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Admins: Use admin credentials. Others: Any email and password.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 glassmorphism border-destructive/50">
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
              className="glassmorphism bg-input/50 border-accent/30"
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
              className="glassmorphism bg-input/50 border-accent/30"
            />
            {form.formState.errors.password && (
              <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30"
            disabled={form.formState.isSubmitting}
          >
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

        <div className="mt-6 p-4 glassmorphism bg-secondary/20 border border-accent/20 rounded-lg">
          <p className="text-xs font-mono text-muted-foreground space-y-1">
            <div>
              <strong>Admin Demo:</strong>
            </div>
            <div>Email: {process.env.NEXT_PUBLIC_ADMIN_EMAIL}</div>
            <div>Password: {process.env.NEXT_PUBLIC_ADMIN_PASSWORD}</div>
          </p>
        </div>
      </div>
    </Card>
  )
}
