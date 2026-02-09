import { API_ENDPOINTS } from "@/lib/api-config"

export async function uploadFile(endpoint: string, file: File, additionalData?: Record<string, string>) {
  const formData = new FormData()
  formData.append("image", file)

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }))
    throw new Error(error.detail || `HTTP ${response.status}`)
  }

  return response.json()
}

export async function getPersons() {
  const response = await fetch(API_ENDPOINTS.persons, { method: "GET" })
  if (!response.ok) throw new Error("Failed to fetch persons")
  return response.json()
}

export async function deletePerson(personId: string) {
  const response = await fetch(`${API_ENDPOINTS.persons}/${personId}`, { method: "DELETE" })
  if (!response.ok) throw new Error("Failed to delete person")
  return response.json()
}

export async function enrollFace(
  personId: string,
  file: File,
  data?: { full_name?: string; email?: string; mobile_number?: string; address?: string; criminal_records?: string },
) {
  const additionalData: Record<string, string> = { person_id: personId }
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (value) additionalData[key] = value
    })
  }
  return uploadFile(API_ENDPOINTS.enrollFace, file, additionalData)
}

export async function enrollFingerprint(
  personId: string,
  file: File,
  data?: { full_name?: string; email?: string; mobile_number?: string; address?: string; criminal_records?: string },
) {
  const additionalData: Record<string, string> = { person_id: personId }
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (value) additionalData[key] = value
    })
  }
  return uploadFile(API_ENDPOINTS.enrollFingerprint, file, additionalData)
}

export async function matchFace(file: File) {
  return uploadFile(API_ENDPOINTS.matchFace, file)
}

export async function matchFingerprint(file: File) {
  return uploadFile(API_ENDPOINTS.matchFingerprint, file)
}

export async function verify(faceFile?: File, fingerprintFile?: File) {
  const formData = new FormData()
  if (faceFile) formData.append("face_image", faceFile)
  if (fingerprintFile) formData.append("fingerprint_image", fingerprintFile)

  const response = await fetch(API_ENDPOINTS.verify, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }))
    throw new Error(error.detail || `HTTP ${response.status}`)
  }

  return response.json()
}
