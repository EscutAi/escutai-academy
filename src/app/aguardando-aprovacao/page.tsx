'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'

export default function AguardandoAprovacao() {
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    const verificarAutorizacao = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: autorizacao } = await supabase
        .from('usuarios_autorizados')
        .select('autorizado')
        .eq('id', user.id)
        .single()

      if (autorizacao?.autorizado) {
        router.push('/cursos')
      }
    }

    verificarAutorizacao()
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md border border-yellow-400 bg-yellow-100/10 rounded-xl p-6 shadow-md text-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">
          Aguardando Liberação
        </h1>
        <p className="text-sm text-foreground mb-2">
          Seu cadastro foi concluído com sucesso! Agora estamos apenas verificando o pagamento.
        </p>
        <p className="text-sm text-foreground">
          Assim que confirmarmos, você terá acesso imediato aos cursos da EscutAI Academy.
        </p>

        <div className="mt-6 text-xs text-muted-foreground">
          Já efetuou o pagamento? Aguarde alguns minutos ou{' '}
          <a
            href="https://wa.me/5581992853655"
            className="underline font-semibold hover:text-green-500 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            fale com nosso suporte
          </a>{' '}
          em caso de dúvidas.
        </div>
      </div>
    </div>
  )
}
