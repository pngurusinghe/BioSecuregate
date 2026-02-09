"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Camera, Upload, AlertCircle, CheckCircle2, X, Fingerprint, ScanFace } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api-config"
import { CameraCapture } from "@/components/camera-capture"

export function MatchForm() {
  const [faceFile, setFaceFile] = useState<File | null>(null)
  const [fpFile, setFpFile] = useState<File | null>(null)

  const [showFaceCamera, setShowFaceCamera] = useState(false)
  const [showFpCamera, setShowFpCamera] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const facePreview = useMemo(() => (faceFile ? URL.createObjectURL(faceFile) : null), [faceFile])
  const fpPreview = useMemo(() => (fpFile ? URL.createObjectURL(fpFile) : null), [fpFile])

  const clearAll = () => {
    setFaceFile(null)
    setFpFile(null)
    setError(null)
    setResult(null)
  }

  const submitVerify = async () => {
    setError(null)
    setResult(null)

    if (!faceFile && !fpFile) {
      setError("Please provide at least a face image OR a fingerprint image.")
      return
    }

    try {
      setLoading(true)

      const fd = new FormData()
      if (faceFile) fd.append("face_image", faceFile)
      if (fpFile) fd.append("fingerprint_image", fpFile)

      const res = await fetch(API_ENDPOINTS.verify, {
        method: "POST",
        body: fd,
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || "Verification failed")
      }

      const data = await res.json()
      setResult(data)
    } catch (e: any) {
      setError(e?.message || "Verification failed.")
    } finally {
      setLoading(false)
    }
  }

  const accessGranted = !!result?.access_granted

  return (
    <Card className="p-6 space-y-6 bg-card/50 border-border">
      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="break-words">{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Alert className={accessGranted ? "" : "border-destructive/40"}>
          {accessGranted ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertDescription className="break-words">
            <div className="font-semibold">{accessGranted ? "Access Granted ✅" : "Access Denied ❌"}</div>
            <div className="text-xs opacity-80 mt-1">{result?.decision_rule}</div>
          </AlertDescription>
        </Alert>
      )}

      {/* FACE SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanFace className="w-4 h-4 text-accent" />
            <div>
              <div className="text-sm font-semibold">Face Matching</div>
              <div className="text-xs text-muted-foreground">Upload or capture a face image</div>
            </div>
          </div>

          {faceFile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFaceFile(null)
                setResult(null)
              }}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" className="gap-2" onClick={() => setShowFaceCamera(true)}>
            <Camera className="w-4 h-4" />
            Use Webcam
          </Button>

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-transparent hover:bg-accent/5 cursor-pointer text-sm">
            <Upload className="w-4 h-4" />
            Upload Face
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setResult(null)
                setFaceFile(e.target.files?.[0] || null)
              }}
            />
          </label>
        </div>

        {facePreview ? (
          <div className="rounded-lg overflow-hidden border border-border bg-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={facePreview} alt="Face preview" className="w-full aspect-video object-cover" />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            No face image selected (optional).
          </div>
        )}

        {showFaceCamera && (
          <div className="p-4 rounded-lg border border-border glassmorphism space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Capture Face</div>
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowFaceCamera(false)}>
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>

            <CameraCapture
              facingMode="user"
              onCapture={(file) => {
                setFaceFile(file)
                setShowFaceCamera(false)
                setResult(null)
              }}
              onClose={() => setShowFaceCamera(false)}
              onCancel={() => setShowFaceCamera(false)}
            />
          </div>
        )}
      </div>

      {/* FINGERPRINT SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-accent" />
            <div>
              <div className="text-sm font-semibold">Fingerprint Matching</div>
              <div className="text-xs text-muted-foreground">Upload fingerprint image (optional)</div>
            </div>
          </div>

          {fpFile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFpFile(null)
                setResult(null)
              }}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Optional: camera capture for fingerprint image too */}
          <Button type="button" variant="outline" className="gap-2" onClick={() => setShowFpCamera(true)}>
            <Camera className="w-4 h-4" />
            Use Camera
          </Button>

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-transparent hover:bg-accent/5 cursor-pointer text-sm">
            <Upload className="w-4 h-4" />
            Upload Fingerprint
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setResult(null)
                setFpFile(e.target.files?.[0] || null)
              }}
            />
          </label>
        </div>

        {fpPreview ? (
          <div className="rounded-lg overflow-hidden border border-border bg-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fpPreview} alt="Fingerprint preview" className="w-full aspect-video object-cover" />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            No fingerprint image selected (optional).
          </div>
        )}

        {showFpCamera && (
          <div className="p-4 rounded-lg border border-border glassmorphism space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Capture Fingerprint (Image)</div>
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowFpCamera(false)}>
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>

            <CameraCapture
              facingMode="environment"
              onCapture={(file) => {
                setFpFile(file)
                setShowFpCamera(false)
                setResult(null)
              }}
              onClose={() => setShowFpCamera(false)}
              onCancel={() => setShowFpCamera(false)}
            />
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col gap-2">
        <Button onClick={submitVerify} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify (Face / Fingerprint / 2FA)"
          )}
        </Button>

        <Button variant="outline" className="w-full" onClick={clearAll}>
          Reset
        </Button>
      </div>

      {/* RESULT DETAILS */}
      {result && (
        <div className="rounded-lg border border-border p-4 bg-background/30 space-y-2">
          <div className="text-sm font-semibold">Result Details</div>

          <div className="text-xs text-muted-foreground">
            Face Provided: <span className="font-mono">{String(result.face_provided)}</span> | Fingerprint Provided:{" "}
            <span className="font-mono">{String(result.fingerprint_provided)}</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-border p-3">
              <div className="font-medium mb-1">Face</div>
              <div className="text-xs text-muted-foreground">
                Matched: <span className="font-mono">{String(result.face_matched)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Similarity: <span className="font-mono">{result.face_similarity ?? "-"}</span> (thr{" "}
                <span className="font-mono">{result.face_threshold}</span>)
              </div>
              <div className="text-xs text-muted-foreground">
                person_id: <span className="font-mono">{result.face_person_id ?? "-"}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                name: <span className="font-mono">{result.face_full_name ?? "-"}</span>
              </div>
            </div>

            <div className="rounded-md border border-border p-3">
              <div className="font-medium mb-1">Fingerprint</div>
              <div className="text-xs text-muted-foreground">
                Matched: <span className="font-mono">{String(result.fingerprint_matched)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Similarity: <span className="font-mono">{result.fingerprint_similarity ?? "-"}</span> (thr{" "}
                <span className="font-mono">{result.fingerprint_threshold}</span>)
              </div>
              <div className="text-xs text-muted-foreground">
                person_id: <span className="font-mono">{result.fingerprint_person_id ?? "-"}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                name: <span className="font-mono">{result.fingerprint_full_name ?? "-"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        Endpoint: <span className="font-mono">{API_ENDPOINTS.verify}</span>
      </div>
    </Card>
  )
}
