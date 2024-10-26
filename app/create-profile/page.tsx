'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'
import { createProfile } from '../signup/actions'
import { createClient } from '@/utils/client'

export default function CreateProfile() {
  const router = useRouter()
  const supabase = createClient()

  // State for form fields
  const [formData, setFormData] = useState({
    badgeNumber: '',
    lastName: '',
    otherNames: '',
    passportNumber: '',
    dateOfBirth: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUserId(user?.id || null);
      }
    };

    fetchUser();
  }, [supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    
    try {
      const result = await createProfile(userId ?? '', {
        badgeNumber: formData.badgeNumber,
        lastName: formData.lastName,
        otherNames: formData.otherNames,
        passportNumber: formData.passportNumber,
        dateOfBirth: formData.dateOfBirth,
      })

      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else if (result.success) {
        setMessage({ type: 'success', text: 'Profile created successfully!' })
        setTimeout(() => {
          router.push('/dashboard')  // Redirect to the dashboard after success
        }, 1000)
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create profile' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Profile</CardTitle>
        <CardDescription>Please provide your details to complete your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="badgeNumber">Badge Number</Label>
            <Input
              id="badgeNumber"
              value={formData.badgeNumber}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otherNames">Other Names</Label>
            <Input
              id="otherNames"
              value={formData.otherNames}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="passportNumber">Passport Number</Label>
            <Input
              id="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Profile...' : 'Create Profile'}
          </Button>
        </form>

        {message && (
          <Alert 
            className={`mt-4 ${message.type === 'success' ? 'bg-green-100 border-green-600' : 'bg-red-100 border-red-600'}`}
            variant={message.type === 'success' ? 'default' : 'destructive'}
          >
            <AlertCircle className={message.type === 'success' ? 'text-green-600' : 'text-red-600'} />
            <AlertTitle>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
