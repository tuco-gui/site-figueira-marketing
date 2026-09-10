import { Link, useLocation } from 'react-router-dom'

export default function PageNotFound() {
  const location = useLocation()

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-lg text-center">
        <p className="font-mono text-sm text-primary mb-4">404</p>
        <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight mb-4">
          Esta página não existe.
        </h1>
        <p className="text-muted-foreground mb-8">
          Não encontramos <span className="font-medium text-foreground">{location.pathname}</span>.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-foreground text-white font-semibold"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  )
}