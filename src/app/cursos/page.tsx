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
    <div className="min-h-screen flex flex-col px-[20%] py-8 w-full">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Meus Cursos</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-muted-foreground hover:underline transition"
        >
          Sair
        </button>
      </header>

      <div className="w-full mb-8 aspect-video">
        <iframe
          src="https://drive.google.com/file/d/SEU_ID_DO_VIDEO/preview"
          allow="autoplay"
          className="w-full h-full rounded-md"
        />
      </div>

      <div className="flex flex-col gap-4 w-full mb-12">
        <button
          onClick={() => router.push('/violao')}
          className="w-full py-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 transition text-lg font-medium text-zinc-800"
        >
          Violão
        </button>
        <button
          onClick={() => router.push('/ukulele')}
          className="w-full py-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 transition text-lg font-medium text-zinc-800"
        >
          Ukulele
        </button>
        <button
          onClick={() => router.push('/teclado')}
          className="w-full py-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 transition text-lg font-medium text-zinc-800"
        >
          Teclado
        </button>
      </div>

      <footer className="mt-auto text-center text-sm text-muted-foreground space-y-2 pb-6">
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
        <p>© 2025 EscutAI Academy. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
