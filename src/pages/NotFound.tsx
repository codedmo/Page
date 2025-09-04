import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[calc(68vh-theme(spacing.16)-theme(spacing.20))] tech-bg flex items-center justify-center p-4 pt-20">
      <div className="error-card max-w-2xl w-full text-center">
        <div className="space-y-8">
          {/* Título principal con efecto glitch */}
          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-black glitch" data-text="404">
              404
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-teal-400 rounded"></div>
          </div>

          {/* Mensaje de error */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              SISTEMA_ERROR.EXE
            </h2>
            <p className="text-slate-300 text-lg">
              La página solicitada no fue encontrada en el servidor
            </p>
            <p className="text-slate-400 text-sm font-mono">
              ERROR_CODE: 0x404_NOT_FOUND
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              ← Volver al inicio
            </Link>
            <Link 
              to="/contacto" 
              className="px-6 py-3 border border-teal-500/50 text-teal-400 font-semibold rounded-lg hover:bg-teal-500/10 transition-all duration-300"
            >
              Reportar error
            </Link>
          </div>

          {/* Información adicional */}
          <div className="text-xs text-slate-500 font-mono space-y-1">
            <p>Si continúas experimentando problemas, contacta al administrador</p>
            <p className="text-slate-600">TIMESTAMP: {new Date().toISOString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
