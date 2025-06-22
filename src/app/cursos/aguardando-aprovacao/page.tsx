export default function AguardandoAprovacao() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md border border-yellow-400 bg-yellow-100/10 rounded-xl p-6 shadow-md text-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">
          Aguardando Liberação
        </h1>
        <p className="text-sm text-foreground mb-2">
          Seu cadastro foi concluído com sucesso! Agora estamos apenas verificando o pagamento.
        </p>export default function AguardandoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">🚧 Aguardando Liberação</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Seu pagamento está sendo processado. Assim que for confirmado, o acesso aos cursos será liberado.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Se você já pagou, aguarde alguns minutos ou entre em contato com o suporte.
        </p>
      </div>
    </div>
  )
}
        <p className="text-sm text-foreground">
          Assim que confirmarmos, você terá acesso imediato aos cursos da EscutAI Academy.
        </p>

        <div className="mt-6 text-xs text-muted-foreground">
          Já efetuou o pagamento? Aguarde alguns minutos ou{' '}
          <a
            href="https://wa.me/81992853655"
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
