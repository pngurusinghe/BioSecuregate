"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdmin } from "@/lib/auth"
import { EnrollForm } from "@/components/enroll-form"

export default function EnrollPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="p-6 max-w-2xl">
      <div className="space-y-4 mb-6">
        <h1 className="text-3xl font-bold">Admin Enrollment</h1>
        <p className="text-muted-foreground">Enroll new biometric data for persons (Admin only)</p>
      </div>
      <EnrollForm />
    </div>
  )
}
