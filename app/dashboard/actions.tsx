// app/actions.ts
'use server'

import { createClient } from '@/utils/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createClient()
  
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/login')
}