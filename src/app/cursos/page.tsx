import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import CursosClient from './CursosClient'

export default async function CursosPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: cursos, error } = await supabase.from('cursos').select('*')

  return <CursosClient cursos={cursos || []} />
}
