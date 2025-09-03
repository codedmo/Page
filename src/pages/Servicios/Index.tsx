import { Link, Outlet } from 'react-router-dom';

export default function Servicios() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Servicios</h2>
      <ul className="space-y-2 mb-6">
        <li><Link className="text-blue-600 hover:underline" to="desarrollo">Desarrollo web y de software</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="hosting">Alquiler de Hosting</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="integracion">Servicios de Integración</Link></li>
      </ul>
      <Outlet />
    </div>
  );
}
