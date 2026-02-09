export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  persons: `${API_BASE_URL}/api/persons`,
  personFaceImage: (personId: string) => `${API_BASE_URL}/api/persons/${personId}/face-image`,

  enrollFace: `${API_BASE_URL}/api/enroll/face`,
  enrollFingerprint: `${API_BASE_URL}/api/enroll/fingerprint`,

  matchFace: `${API_BASE_URL}/api/match/face`,
  matchFingerprint: `${API_BASE_URL}/api/match/fingerprint`,

  verify: `${API_BASE_URL}/api/verify`,
}
