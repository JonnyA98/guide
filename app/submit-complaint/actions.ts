'use server'

import { createClient } from '@/utils/server'

type PositiveReviewData = {
  company_id: number
  address: string
  date_of_incident: string // in YYYY-MM-DD format
  employee_status: boolean
  recommend: boolean
  diverse_environment: boolean
  description: string
}

type NegativeReviewData = {
  company_id: number
  address: string
  date_of_report: string // in YYYY-MM-DD format
  employee_status: boolean
  accessability_issue: number
  describe: string
  improvement_suggestions: string
  other_issue: string
  anon: boolean
}

type SubmitResult = {
  success?: boolean
  error?: string
}

export async function submitPositiveReview(data: PositiveReviewData): Promise<SubmitResult> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('good_report')
    .insert({
      company_id: data.company_id,
      address: data.address,
      date_of_incident: data.date_of_incident,
      employee_status: data.employee_status,
      recommend: data.recommend,
      diverse_environment: data.diverse_environment,
      description: data.description,
      created_at: new Date().toISOString()
    })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function submitNegativeReview(data: NegativeReviewData): Promise<SubmitResult> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('bad_report')
    .insert({
      company_id: data.company_id,
      address: data.address,
      date_of_report: data.date_of_report,
      employee_status: data.employee_status,
      accessability_issue: data.accessability_issue,
      describe: data.describe,
      improvement_suggestions: data.improvement_suggestions,
      other_issue: data.other_issue,
      anon: data.anon,
      created_at: new Date().toISOString()
    })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

