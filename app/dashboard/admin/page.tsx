"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdmin } from "@/lib/auth"
import { EnrollForm } from "@/components/enroll-form"

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin()) router.replace("/dashboard")
  }, [router])

  return (
    <div className="p-6 max-w-3xl">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Enrollment is available for Admin users only.</p>
      </div>

      <EnrollForm />
    </div>
  )
}
