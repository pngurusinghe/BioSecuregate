import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function CombinedVerifyPage() {
  return (
    <div className="p-6 max-w-2xl">
      <div className="space-y-4 mb-6">
        <h1 className="text-3xl font-bold">Combined Verification</h1>
        <p className="text-muted-foreground">Multi-factor biometric verification</p>
      </div>

      <Card className="bg-card/50 border-border p-6">
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Combined verification allows matching against both face and fingerprint data simultaneously for enhanced
            security.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Combined verification endpoint available at:</p>
            <code className="text-xs bg-background px-3 py-2 rounded block">
              POST http://127.0.0.1:8000/api/match/combined
            </code>
          </div>

          <p className="text-sm text-muted-foreground">
            This feature requires both face and fingerprint images to be provided. The system will match both biometric
            types and return a combined match result.
          </p>
        </div>
      </Card>
    </div>
  )
}
