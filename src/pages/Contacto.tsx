import Contact from "@/components/contact"
import { Mail, Phone, MapPin, Clock, Github, Linkedin } from 'lucide-react'
import { gradients } from '@/config/theme-colors'

export default function Contacto() {
  return (
    <section className={`relative py-20 min-h-screen bg-gradient-to-br ${gradients.backgroundMain} overflow-hidden`}>      
      {/* Vintage minimal overlay usando colores del tema (sutileza, sin ruido pesado) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.04)_0%,transparent_20%),radial-gradient(circle_at_90%_90%,rgba(6,182,212,0.03)_0%,transparent_25%)]`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,245,0.02),transparent)]"></div>
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.12),transparent_50%)] opacity-20 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">Contacto</h1>
            <p className="text-sm text-white/90 max-w-2xl mx-auto">Cuéntanos sobre tu proyecto y te responderemos pronto. Preferimos mensajes claros y precisos.</p>

            {/* Vintage divider */}
            <div className="mt-6 flex items-center justify-center">
              <span className="inline-block w-24 h-px bg-white/20 mr-3"></span>
              <span className="text-xs text-white/60 uppercase tracking-wider">Hablemos</span>
              <span className="inline-block w-24 h-px bg-white/20 ml-3"></span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left column - información de contacto (más pequeña) */}
            <aside className="md:col-span-1 bg-gradient-to-br from-black/20 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Información</h2>
              <p className="text-sm text-white/80 mb-6">Teléfono, correo y dirección. Horario laboral: Lun - Vie.</p>

              <ul className="space-y-4 text-white/90">
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-white/90 mt-1" />
                  <a href="mailto:info@codedmo.dev" className="hover:underline">info@codedmo.dev</a>
                </li>

                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-white/90 mt-1" />
                  <a href="tel:+50237923612" className="hover:underline">+502 3792-3612</a>
                </li>

                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-white/90 mt-1" />
                  <span>Guatemala, Guatemala</span>
                </li>

                <li className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-white/90 mt-1" />
                  <span>Lun - Vie: 08:00 - 18:00</span>
                </li>
              </ul>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-white mb-3">Síguenos</h3>
                <div className="flex items-center space-x-3">
                  <a href="https://github.com/codedmo" target="_blank" rel="noopener noreferrer" title="GitHub - codedmo" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <Github className="w-5 h-5 text-white/90" />
                  </a>
                  <a href="https://linkedin.com/company/codedmo" target="_blank" rel="noopener noreferrer" title="LinkedIn - codedmo" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <Linkedin className="w-5 h-5 text-white/90" />
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <a href="mailto:info@codedmo.dev" className={`inline-block px-4 py-2 rounded-full text-white bg-gradient-to-r ${gradients.primary} hover:scale-105 transition-transform font-semibold`}>Enviar email</a>
              </div>

              {/* Paper corner accent */}
              <div className="absolute -bottom-6 left-6 w-20 h-12 rotate-[-12deg] bg-[linear-gradient(90deg,rgba(255,255,255,0.06),transparent)] blur-sm opacity-40 pointer-events-none"></div>
            </aside>

            {/* Right column - formulario (más grande) */}
            <main className="md:col-span-2 bg-white/6 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="prose prose-invert max-w-none text-white/90">
                <Contact />
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  )
}
