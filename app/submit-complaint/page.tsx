'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SubmitComplaintPage() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // TODO: Implement complaint submission logic
    alert('Complaint submitted successfully!')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" required />
        </div>
        <div>
          <Label htmlFor="category">Complaint Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hiring">Hiring Process</SelectItem>
              <SelectItem value="workplace">Workplace Environment</SelectItem>
              <SelectItem value="promotion">Promotion</SelectItem>
              <SelectItem value="compensation">Compensation</SelectItem>
              <SelectItem value="termination">Termination</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="incident_date">Incident Date</Label>
          <Input id="incident_date" type="date" required />
        </div>
        <div>
          <Label htmlFor="description">Detailed Description</Label>
          <Textarea
            id="description"
            placeholder="Please provide a detailed account of the incident, including any relevant context, witnesses, or evidence."
            required
          />
        </div>
        <div>
          <Label htmlFor="impact">Impact on You</Label>
          <Textarea
            id="impact"
            placeholder="How has this incident affected you personally or professionally?"
            required
          />
        </div>
        <div>
          <Label htmlFor="desired_outcome">Desired Outcome</Label>
          <Textarea
            id="desired_outcome"
            placeholder="What would you like to see happen as a result of this complaint?"
            required
          />
        </div>
        <Button type="submit">Submit Complaint</Button>
      </form>
    </div>
  )
}