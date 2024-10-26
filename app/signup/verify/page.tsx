'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function VerifyEmail() {
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/create-profile')
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
        <CardDescription>Please check your email for a verification link.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Once you've verified your email, you can proceed to create your profile.</p>
        <Button onClick={handleRedirect} className="w-full">
          Go to Create Profile Page
        </Button>
      </CardContent>
    </Card>
  )
}
