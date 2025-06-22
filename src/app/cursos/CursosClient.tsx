'use client'

import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'

export default function CursosClient({ cursos }: { cursos: any[] }) {
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meus Cursos</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Sair
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cursos.map((curso) => (
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
