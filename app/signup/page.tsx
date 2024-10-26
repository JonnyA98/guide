'use client'

import { useState } from 'react'
import { signUpUser } from './actions' // Import the new function
import { AuthError } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

export default function BlueBadgeAuth() {
  const router = useRouter()

  // State for form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const result = await signUpUser({
        email: formData.email,
        password: formData.password,
      })

      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else if (result.success) {
        setMessage({ type: 'success', text: 'Sign up successful! Please check your email for verification.' })
        setTimeout(() => {
          router.push('/signup/verify')  // Redirect to the verification page
        }, 1000)
      }
    } catch (error) {
      const authError = error as AuthError
      setMessage({ type: 'error', text: authError.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Please provide your email and password to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
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

