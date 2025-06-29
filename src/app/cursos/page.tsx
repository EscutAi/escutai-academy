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
    return <div className="loading">Carregando...</div>
  }

  return (
    <div className="cursos-page">
      <header className="cursos-header">
        <h1>Meus Cursos</h1>
        <button onClick={handleLogout}>Sair</button>
      </header>

      <div className="video-container">
        <iframe
          src="https://drive.google.com/file/d/1rbafXdPQRGr65akm4jvsOtit60HkxLPe/preview"
          allow="autoplay"
          className="video-frame"
        />
      </div>

      <div className="curso-buttons">
        <button onClick={() => router.push('/violao')}>Violão</button>
        <button onClick={() => router.push('/ukulele')}>Ukulele</button>
        <button onClick={() => router.push('/teclado')}>Teclado</button>
      </div>

      <footer className="cursos-footer">
        <p>
          Precisa de ajuda?{' '}
          <a
            href="https://wa.me/5581992853655"
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
