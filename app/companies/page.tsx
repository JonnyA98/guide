"use client"

import { useState } from 'react'
import { Search, Filter, Star, ThumbsUp, ThumbsDown, TrendingUp, Users, BarChart2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Fake data
const companies = [
  { id: 1, name: "TechCorp", positiveReviews: 85, negativeReviews: 15, accessibilityScore: 4.2 },
  { id: 2, name: "EcoSolutions", positiveReviews: 92, negativeReviews: 8, accessibilityScore: 4.7 },
  { id: 3, name: "MegaRetail", positiveReviews: 78, negativeReviews: 22, accessibilityScore: 3.9 },
  { id: 4, name: "HealthPlus", positiveReviews: 88, negativeReviews: 12, accessibilityScore: 4.5 },
]

const recentReviews = [
  { id: 1, company: "TechCorp", type: "positive", comment: "Great accommodations for wheelchair users!", user: "Alex", date: "2023-10-25" },
  { id: 2, company: "MegaRetail", type: "negative", comment: "Aisles too narrow for mobility scooters.", user: "Sam", date: "2023-10-24" },
  { id: 3, company: "EcoSolutions", type: "positive", comment: "Excellent support for visually impaired employees!", user: "Jordan", date: "2023-10-23" },
]

const accessibilityIssues = [
  { name: 'Physical Access', value: 35 },
  { name: 'Visual Aids', value: 25 },
  { name: 'Hearing Support', value: 20 },
  { name: 'Cognitive Assistance', value: 15 },
  { name: 'Other', value: 5 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function ExploreCompanies() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Explore Companies</h1>
      
      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <CardTitle>{company.name}</CardTitle>
              <CardDescription>Accessibility Score: {company.accessibilityScore}/5</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Positive Reviews</span>
                <Badge variant="secondary">{company.positiveReviews}%</Badge>
              </div>
              <Progress value={company.positiveReviews} className="mb-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Total Reviews: {company.positiveReviews + company.negativeReviews}</span>
                <span>
                  <ThumbsUp className="inline-block w-4 h-4 mr-1 text-green-500" />
                  {company.positiveReviews}
                  <ThumbsDown className="inline-block w-4 h-4 mr-1 ml-2 text-red-500" />
                  {company.negativeReviews}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Issues Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                accessibilityIssues: {
                  label: "Accessibility Issues",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accessibilityIssues}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {accessibilityIssues.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                positiveReviews: {
                  label: "Positive Reviews",
                  color: "hsl(var(--chart-1))",
                },
                accessibilityScore: {
                  label: "Accessibility Score",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companies}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="var(--color-positiveReviews)" />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--color-accessibilityScore)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="positiveReviews" fill="var(--color-positiveReviews)" />
                  <Bar yAxisId="right" dataKey="accessibilityScore" fill="var(--color-accessibilityScore)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="negative">Negative</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {recentReviews.map((review) => (
                <div key={review.id} className="flex items-start space-x-4 mb-4">
                  <Avatar>
                    <AvatarFallback>{review.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{review.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {review.company} - {review.date}
                    </p>
                    <p className="mt-1">{review.comment}</p>
                    <div className="mt-2">
                      {review.type === "positive" ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <ThumbsUp className="w-3 h-3 mr-1" /> Positive
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          <ThumbsDown className="w-3 h-3 mr-1" /> Negative
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}