import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Erro ao carregar cursos: {error.message}
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Meus Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cursos?.map((curso) => (
          <div
            key={curso.id}
            className="p-4 border rounded-md bg-background border-foreground/10"
          >
            <h2 className="text-lg font-semibold">{curso.title}</h2>
            <p className="text-sm text-muted-foreground">{curso.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
