"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api-config"
import { UploadBox } from "@/components/upload-box"
import { CameraCapture } from "@/components/camera-capture"

interface VerifyResponse {
  mode: string
  matched: boolean
  person_id?: string
  full_name?: string
  face_similarity?: number
  fingerprint_similarity?: number
  threshold?: number
  [key: string]: any
}

export default function VerifyPage() {
  const [faceImage, setFaceImage] = useState<File | null>(null)
  const [fingerprintImage, setFingerprintImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<VerifyResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [faceCapture, setFaceCapture] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!faceImage && !fingerprintImage) {
      setError("Please upload at least one biometric (face or fingerprint)")
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      const formData = new FormData()
      if (faceImage) {
        formData.append("face_image", faceImage)
      }
      if (fingerprintImage) {
        formData.append("fingerprint_image", fingerprintImage)
      }

      const response = await fetch(API_ENDPOINTS.verify, {
        method: "POST",
        body: formData,
      })

      const data: VerifyResponse = await response.json()

      if (response.ok) {
        setSuccess(data)
        setFaceImage(null)
        setFingerprintImage(null)
      } else {
        setError(data.message || "Verification failed")
      }
    } catch (err) {
      setError("Failed to connect to server. Ensure backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="space-y-4 mb-6">
        <h1 className="text-3xl font-bold">2FA Verification</h1>
        <p className="text-muted-foreground">
          Multi-factor biometric verification. Upload face and/or fingerprint for verification.
        </p>
      </div>

      <Card className="glassmorphism neon-border p-6">
        {error && (
          <Alert variant="destructive" className="mb-6 glassmorphism border-destructive/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert
            className={`mb-6 glassmorphism ${
              success.matched ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"
            }`}
          >
            <CheckCircle2 className={`h-4 w-4 ${success.matched ? "text-green-500" : "text-red-500"}`} />
            <AlertDescription className={success.matched ? "text-green-300" : "text-red-300"}>
              {success.matched ? "Verification successful!" : "Verification failed - No match found"}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Face (Optional)</h3>
              {!faceCapture ? (
                <>
                  <UploadBox onFileSelect={setFaceImage} label="Upload Face Image" accept="image/*" />

                  <div className="relative flex items-center gap-2">
                    <div className="flex-1 h-px bg-border/50" />
                    <span className="text-xs text-muted-foreground">or</span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>

                  <Button
                    type="button"
                    onClick={() => setFaceCapture(true)}
                    variant="outline"
                    className="w-full glassmorphism bg-transparent border-accent/50"
                  >
                    📷 Capture
                  </Button>
                </>
              ) : (
                <CameraCapture
                  onCapture={(file) => {
                    setFaceImage(file)
                    setFaceCapture(false)
                  }}
                  onCancel={() => setFaceCapture(false)}
                />
              )}
              {faceImage && (
                <div className="text-xs text-muted-foreground glassmorphism p-2 rounded border border-accent/20">
                  ✓ {faceImage.name}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Fingerprint (Optional)</h3>
              <UploadBox onFileSelect={setFingerprintImage} label="Upload Fingerprint Image" accept="image/*" />
              {fingerprintImage && (
                <div className="text-xs text-muted-foreground glassmorphism p-2 rounded border border-accent/20">
                  ✓ {fingerprintImage.name}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Verify Identity
              </>
            )}
          </Button>
        </form>

        {success && (
          <Card className="glassmorphism border-border/50 p-4 mt-6 space-y-3">
            <h3 className="font-semibold text-accent">Verification Result</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Mode</span>
                <span className="font-medium">{success.mode}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/30">
                <span className="text-muted-foreground">Status</span>
                <span className={success.matched ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
                  {success.matched ? "Matched" : "No Match"}
                </span>
              </div>
              {success.matched && success.person_id && (
                <>
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Person ID</span>
                    <span className="font-mono text-xs">{success.person_id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Full Name</span>
                    <span className="font-medium">{success.full_name}</span>
                  </div>
                </>
              )}
              {success.face_similarity !== undefined && (
                <div className="flex justify-between py-2 border-b border-border/30">
                  <span className="text-muted-foreground">Face Similarity</span>
                  <span className="font-mono text-accent">{(success.face_similarity * 100).toFixed(2)}%</span>
                </div>
              )}
              {success.fingerprint_similarity !== undefined && (
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Fingerprint Similarity</span>
                  <span className="font-mono text-accent">{(success.fingerprint_similarity * 100).toFixed(2)}%</span>
                </div>
              )}
            </div>
          </Card>
        )}
      </Card>
    </div>
  )
}
