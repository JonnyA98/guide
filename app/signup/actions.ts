'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/server'

interface SignUpResult {
  error?: string;
  success?: boolean;
}

interface SignUpOptions {
  badgeNumber: string;
  lastName: string;
  otherNames: string;
  passportNumber: string;
  dateOfBirth: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
}

// Function to sign up a user
export async function signUpUser({ email, password }: SignUpCredentials): Promise<SignUpResult> {
  const supabase = await createClient()

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (!authData.user) {
    return { error: 'Failed to create user' }
  }

  // Trigger revalidation of the home page or other necessary paths
  revalidatePath('/', 'layout')
  return { success: true }
}

// Function to create a user profile
export async function createProfile(userId: string, data: SignUpOptions): Promise<SignUpResult> {
  const supabase = await createClient()

  const { error: profileError } = await supabase
    .from('profile')
    .insert({
      user_id: userId,
      badge_number: data.badgeNumber,
      last_name: data.lastName,
      other_names: data.otherNames,
      passport_number: data.passportNumber,
      date_of_birth: data.dateOfBirth,
      created_at: new Date().toISOString()
    })

  if (profileError) {
    return { error: profileError.message }
  }

  return { success: true }
}
