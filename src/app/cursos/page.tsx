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

      const { data: autorizacao, error } = await supabase
        .from('usuarios_autorizados')
        .select('autorizado')
        .eq('email', user.email)
        .single()

      if (error && error.code === 'PGRST116') {
        await supabase.from('usuarios_autorizados').insert({
          email: user.email,
          autorizado: false,
        })
        router.push('/aguardando-aprovacao')
        return
      }

      if (!autorizacao?.autorizado) {
        router.push('/aguardando-aprovacao')
        return
      }

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

        {/* Vídeo de boas-vindas */}
        <div className="mb-8">
          <div className="aspect-video w-full rounded overflow-hidden">
            <iframe
              src="https://drive.google.com/file/d/SEU_ID_DO_VIDEO/preview"
              width="100%"
              height="360"
              allow="autoplay"
              className="rounded-md border border-foreground/10"
            ></iframe>
          </div>
        </div>

        {/* Botões de instrumentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => router.push('/violao')}
            className="px-4 py-2 rounded border border-foreground/20 bg-background hover:bg-muted transition"
          >
            Violão
          </button>
          <button
            onClick={() => router.push('/ukulele')}
            className="px-4 py-2 rounded border border-foreground/20 bg-background hover:bg-muted transition"
          >
            Ukulele
          </button>
          <button
            onClick={() => router.push('/teclado')}
            className="px-4 py-2 rounded border border-foreground/20 bg-background hover:bg-muted transition"
          >
            Teclado
          </button>
        </div>

        {/* Cursos cadastrados no Supabase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

        {/* Suporte e rodapé */}
        <div className="text-center text-sm text-muted-foreground mt-12">
          <p>
            Precisa de ajuda?{' '}
            <a
              href="https://wa.me/5581992853655"
              className="underline hover:text-green-500 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale com o suporte
            </a>
          </p>
          <p className="mt-2">© 2025 EscutAI Academy. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}
