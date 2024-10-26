'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { logout } from "./actions"
import { useState } from "react"

export default function DashboardPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Your Complaints</h3>
          <p className="mb-4">You have submitted 0 complaints.</p>
          <Button asChild>
            <Link href="/submit-complaint">Submit a Complaint</Link>
          </Button>
        </div>
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Company Insights</h3>
          <p className="mb-4">View diversity insights for various companies.</p>
          <Button asChild>
            <Link href="/companies">Explore Companies</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}