'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'

export default function CursosPage() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [loading, setLoading] = useState(true)
  const [cursos, setCursos] = useState<any[]>([])

  useEffect(() => {
    const loadUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      // Verifica se o usuário já está na tabela usando o e-mail
      const { data: autorizacao, error } = await supabase
        .from('usuarios_autorizados')
        .select('autorizado')
        .eq('email', user.email)
        .single()

      // Se não existir, cria o registro com autorizado = false
      if (error && error.code === 'PGRST116') {
        await supabase.from('usuarios_autorizados').insert({
          email: user.email,
          autorizado: false,
        })
        router.push('/aguardando-aprovacao')
        return
      }

      // Se já existir mas não estiver autorizado, redireciona
      if (!autorizacao?.autorizado) {
        router.push('/aguardando-aprovacao')
        return
      }

      // Carrega os cursos
      const { data: cursosData } = await supabase.from('cursos').select('*')
      setCursos(cursosData || [])
      setLoading(false)
    }

    loadUserData()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return <div className="p-8 text-center">Carregando...</div>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Meus Cursos</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cursos.length === 0 ? (
            <p className="text-muted-foreground">Nenhum curso disponível.</p>
          ) : (
            cursos.map((curso) => (
              <div
                key={curso.id}
                className="p-4 border rounded-md bg-background border-foreground/10"
              >
                <h2 className="text-lg font-semibold">{curso.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {curso.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
