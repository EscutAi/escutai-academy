export default function AguardandoAprovacaoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold mb-4">🚧 Aguardando Liberação</h1>
        <p className="text-muted-foreground">
          Seu pagamento está sendo processado. Assim que for confirmado, seu acesso aos cursos será liberado.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Se você já realizou o pagamento, aguarde alguns minutos ou entre em contato com nosso suporte pelo WhatsApp.
        </p>
      </div>
    </div>
  )
}
