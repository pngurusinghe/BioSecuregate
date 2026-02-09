const AUTH_STORAGE_KEY = "biosecure_auth"
const ADMIN_STORAGE_KEY = "biosecure_admin"

export interface User {
  id: string
  email: string
  name: string
  isAdmin?: boolean
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

export function setStoredUser(user: User) {
  if (typeof window === "undefined") return
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
}

export function clearStoredUser() {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUTH_STORAGE_KEY)
  localStorage.removeItem(ADMIN_STORAGE_KEY)
}

export function generateUserId(): string {
  return "user_" + Math.random().toString(36).substr(2, 9)
}

export function validateAdminLogin(email: string, password: string): boolean {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  return email === adminEmail && password === adminPassword
}

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(ADMIN_STORAGE_KEY) === "true"
}

export function setAdmin(admin: boolean) {
  if (typeof window === "undefined") return
  if (admin) {
    localStorage.setItem(ADMIN_STORAGE_KEY, "true")
  } else {
    localStorage.removeItem(ADMIN_STORAGE_KEY)
  }
}
