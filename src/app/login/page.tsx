import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/utils/supabase'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Não foi possível fazer login. Verifique suas credenciais.')
    }

    return redirect('/cursos')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/api/auth/callback`,
      },
    })

    if (signUpError || !signUpData.user) {
      return redirect('/login?message=Erro ao criar conta. Tente novamente.')
    }

    // ✅ Insere o usuário na tabela de autorizados com "autorizado: false"
    const { error: insertError } = await supabase.from('usuarios_autorizados').insert([
      {
        id: signUpData.user.id,
        email: email,
        autorizado: false,
      },
    ])

    if (insertError) {
      console.error('Erro ao inserir na tabela usuarios_autorizados:', insertError)
    }

    return redirect('/login?message=Verifique seu e-mail para confirmar o cadastro.')
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <Link
        href="/cursos"
        className="bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm text-foreground no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Voltar
      </Link>

      <form
        className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in"
        action={signIn}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Entrar na EscutAI Academy</h1>

        <label className="text-md" htmlFor="email">
          E-mail
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="voce@email.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Senha
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="mb-2 rounded-md bg-green-700 px-4 py-2 text-white">
          Entrar
        </button>
        <button
          formAction={signUp}
          className="mb-2 rounded-md border border-foreground/20 px-4 py-2 text-foreground"
        >
          Criar nova conta
        </button>
        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
