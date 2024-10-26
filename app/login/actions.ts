// actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/server'

interface LoginResult {
  error?: string;
  success?: boolean;
}



interface LoginCredentials {
  email: string;
  password: string;

}

export async function login({ email, password }: LoginCredentials): Promise<LoginResult> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

