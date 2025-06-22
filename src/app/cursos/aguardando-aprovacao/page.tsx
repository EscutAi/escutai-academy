export default function AguardandoAprovacao() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Aguardando Liberação</h1>
      <p className="text-muted-foreground max-w-md">
        Seu cadastro foi realizado com sucesso! Agora estamos verificando o pagamento. Assim que for confirmado, seu acesso aos cursos será liberado.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Se você já realizou o pagamento, aguarde alguns minutos ou entre em contato com nosso suporte.
      </p>
    </div>
  )
}
