import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to DiversityInsights</h1>
      <p className="text-xl mb-8">Empowering diversity and inclusion in the workplace</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </div>
  )
}
