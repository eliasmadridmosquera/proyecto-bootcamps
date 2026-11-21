import { Link } from 'react-router'

export function NoEncontrada() {
  return (
    <main className="contenido">
      <h1>Página no encontrada</h1>
      <p>La dirección que abriste no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}
