"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Camera, Upload, AlertCircle, CheckCircle2, X } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api-config"
import { CameraCapture } from "@/components/camera-capture"

export function EnrollForm() {
  const [personId, setPersonId] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [address, setAddress] = useState("")
  const [criminalRecords, setCriminalRecords] = useState("")

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [showCamera, setShowCamera] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const previewUrl = useMemo(() => {
    if (!imageFile) return null
    return URL.createObjectURL(imageFile)
  }, [imageFile])

  const clearPreview = () => {
    setImageFile(null)
    setSuccess(null)
    setError(null)
  }

  const onPickFile = (f: File | null) => {
    setSuccess(null)
    setError(null)
    setImageFile(f)
  }

  const onSubmit = async () => {
    setError(null)
    setSuccess(null)

    if (!personId.trim()) {
      setError("person_id is required.")
      return
    }
    if (!imageFile) {
      setError("Face image is required (upload or capture).")
      return
    }

    try {
      setLoading(true)

      const fd = new FormData()
      fd.append("person_id", personId.trim())
      fd.append("full_name", fullName || "")
      fd.append("email", email || "")
      fd.append("mobile_number", mobileNumber || "")
      fd.append("address", address || "")
      fd.append("criminal_records", criminalRecords || "")
      fd.append("image", imageFile)

      const res = await fetch(API_ENDPOINTS.enrollFace, {
        method: "POST",
        body: fd,
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || "Enroll failed")
      }

      const data = await res.json()
      setSuccess(data)
    } catch (e: any) {
      setError(e?.message || "Enroll failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 space-y-5 bg-card/50 border-border">
      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="break-words">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="break-words">
            Enrolled successfully: <span className="font-semibold">{success?.person_id}</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Person fields */}
      <div className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">person_id *</label>
            <Input value={personId} onChange={(e) => setPersonId(e.target.value)} placeholder="e.g. P001" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">full_name</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. John Silva" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. john@mail.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">mobile_number</label>
            <Input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="+94 7X XXX XXXX" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">address</label>
          <Textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address (optional)" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">criminal_records</label>
          <Textarea
            value={criminalRecords}
            onChange={(e) => setCriminalRecords(e.target.value)}
            placeholder="Optional notes (leave empty if none)"
          />
        </div>
      </div>

      {/* Image area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium">Face image *</div>
            <div className="text-xs text-muted-foreground">Upload from phone/PC OR capture using webcam.</div>
          </div>

          {imageFile && (
            <Button variant="outline" size="sm" className="gap-2" onClick={clearPreview}>
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" className="gap-2" onClick={() => setShowCamera(true)}>
            <Camera className="w-4 h-4" />
            Use Camera
          </Button>

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-transparent hover:bg-accent/5 cursor-pointer text-sm">
            <Upload className="w-4 h-4" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPickFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="rounded-lg overflow-hidden border border-border bg-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Face preview" className="w-full aspect-video object-cover" />
          </div>
        )}

        {!previewUrl && (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            No image selected. Use <span className="font-medium">Camera</span> or <span className="font-medium">Upload</span>.
          </div>
        )}
      </div>

      {/* Camera panel */}
      {showCamera && (
        <div className="p-4 rounded-lg border border-border glassmorphism space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Camera Capture</div>
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowCamera(false)}>
              <X className="w-4 h-4" />
              Close
            </Button>
          </div>

          <CameraCapture
            facingMode="user"
            onCapture={(file) => {
              setImageFile(file)
              setShowCamera(false)
            }}
            onClose={() => setShowCamera(false)}
            onCancel={() => setShowCamera(false)}
          />
        </div>
      )}

      {/* Submit */}
      <Button onClick={onSubmit} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enrolling...
          </>
        ) : (
          "Enroll Face"
        )}
      </Button>

      <div className="text-xs text-muted-foreground">
        Endpoint: <span className="font-mono">{API_ENDPOINTS.enrollFace}</span>
      </div>
    </Card>
  )
}
