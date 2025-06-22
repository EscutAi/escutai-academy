import Link from 'next/link'
import AuthButton from '@/components/AuthButton'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from '@/components/ThemeToggle'

export default async function HomePage() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    try {
      createServerClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* Topo da página */}
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      {/* Conteúdo principal da landing */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à EscutAI Academy!</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-xl">
          Aprenda música do zero com aulas práticas e simples. Acesse nossos cursos de ukulele, violão, teclado e muito mais!
        </p>
        <Link href="/login">
          <button className="rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition">
            Acessar cursos
          </button>
        </Link>
      </main>

      {/* Rodapé */}
      <footer className="w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
        <p className="mb-6">
          Desenvolvido com{' '}
          <a
            href="https://supabase.com"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
        <ThemeToggle />
      </footer>
    </div>
  )
}
