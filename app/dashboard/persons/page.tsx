"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Trash2 } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api-config"
import { DeleteDialog } from "@/components/delete-dialog"

interface Person {
  person_id: string
  full_name: string
  has_face: boolean
  has_fingerprint: boolean
}

export default function PersonsPage() {
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchPersons = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(API_ENDPOINTS.persons)
      const data = await response.json()

      if (Array.isArray(data)) {
        setPersons(data)
      } else {
        setError("Invalid response format")
      }
    } catch (err) {
      setError("Failed to fetch persons. Please ensure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (person: Person) => {
    setSelectedPerson(person)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedPerson) return

    try {
      setDeleteLoading(true)
      const url = `${API_ENDPOINTS.persons}/${selectedPerson.person_id}`
      const response = await fetch(url, {
        method: "DELETE",
      })

      if (response.ok) {
        setPersons(persons.filter((p) => p.person_id !== selectedPerson.person_id))
        setDeleteDialogOpen(false)
        setSelectedPerson(null)
      } else {
        setError("Failed to delete person")
      }
    } catch (err) {
      setError("Failed to connect to server")
    } finally {
      setDeleteLoading(false)
    }
  }

  useEffect(() => {
    fetchPersons()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Persons Management</h1>
        <p className="text-muted-foreground">View and manage enrolled persons</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="bg-card/50 border-border p-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-muted rounded animate-pulse" />
            ))}
          </div>
        ) : persons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold">Person ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Full Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Face Enrolled</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Fingerprint Enrolled</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {persons.map((person) => (
                  <tr
                    key={person.person_id}
                    className="border-b border-border/50 hover:bg-background/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <code className="text-xs bg-background/50 px-2 py-1 rounded">{person.person_id}</code>
                    </td>
                    <td className="py-3 px-4 font-medium">{person.full_name}</td>
                    <td className="py-3 px-4">
                      {person.has_face ? <Badge variant="secondary">Yes</Badge> : <Badge variant="outline">No</Badge>}
                    </td>
                    <td className="py-3 px-4">
                      {person.has_fingerprint ? (
                        <Badge variant="secondary">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(person)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No persons enrolled yet</p>
            <p className="text-xs text-muted-foreground mt-2">Start by enrolling face or fingerprint data</p>
          </div>
        )}
      </Card>

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Person"
        description={`Are you sure you want to delete ${selectedPerson?.full_name} (${selectedPerson?.person_id})? This action cannot be undone.`}
        isLoading={deleteLoading}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
