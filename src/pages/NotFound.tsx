import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="mt-4 text-xl">Página no encontrada</p>
      <Link to="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded">
        Volver al inicio
      </Link>
    </div>
  );
}
