'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'

export default function CursosPage() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [loading, setLoading] = useState(true)
  const [erroMsg, setErroMsg] = useState<string | null>(null)

  useEffect(() => {
    const exec = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser()
      console.log('AUTENTICAÇÃO:', authData, authError)

      const user = authData?.user
      if (!user) {
        router.push('/login'); return
      }

      const { data: autorizacao, error: erroAutorizacao } = await supabase
        .from('usuarios_autorizados')
        .select('autorizado')
        .eq('id', user.id)
        .single()

      console.log('AUTORIZAÇÃO RAW:', autorizacao, erroAutorizacao)

      // Mostre erro visualmente para facilitar testes
      if (erroAutorizacao) {
        setErroMsg('Erro no Supabase: ' + erroAutorizacao.message)
        return
      }

      // Diagnóstico de tipo
      const valor = autorizacao?.autorizado
      console.log('Tipo de autorizado:', typeof valor, '=>', valor)

      if (valor !== true) {
        setErroMsg('Não está autorizado 😕 Valor: ' + String(valor))
        router.push('/aguardando-aprovacao')
        return
      }

      // Se autorizado, carrega cursos
      const { data, error } = await supabase.from('cursos').select('*')
      console.log('CURSOS:', data, error)
      setLoading(false)
    }

    exec()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (erroMsg) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-bold">{erroMsg}</p>
      </div>
    )
  }

  if (loading) {
    return <div className="p-8 text-center">Carregando...</div>
  }

  // ... restante render normalmente ...
}
