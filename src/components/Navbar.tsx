import { Link } from 'react-router-dom';
import { useState } from "react"

import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Navbar() {
  // Detectar si el dispositivo es touch
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Rutas de servicios
  const serviceRoutes = [
    { name: "Desarrollo web y de software", to: "/servicios/desarrollo" },
    { name: "Alquiler de Hosting", to: "/servicios/hosting" },
    { name: "Servicios de Integración", to: "/servicios/integracion" },
    // Agrega más servicios aquí si tienes más rutas
  ];

  const navItems = [
    { name: "Inicio", to: "/" },
    { name: "Servicios", to: "/servicios", hasDropdown: true },
    { name: "Contacto", to: "/contacto" },
  ];


  return (




  <header
    className={`fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-gray-200/30 dark:border-gray-800/30 transition-shadow duration-300 ${showShadow ? "shadow-lg" : "shadow-none"}`}
  >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            title="Ir al inicio"
            aria-label="Ir al inicio"
          >
            <img 
              src="/codedmo-logo.svg" 
              alt="CODEDMO Logo" 
              width={120} 
              height={40} 
              className="h-10 w-auto"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => !isTouchDevice && setIsServicesOpen(true)}
                    onMouseLeave={() => !isTouchDevice && setIsServicesOpen(false)}
                  >
                    {isTouchDevice ? (
                      <button
                        type="button"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium focus:outline-none"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsServicesOpen((open) => !open);
                        }}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    ) : (
                      <Link
                        to={item.to}
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Link>
                    )}
                    {/* Dropdown Menu */}
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-fade-in">
                        {serviceRoutes.map((service) => (
                          <Link
                            key={service.name}
                            to={service.to}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          {/* No Desktop Actions, se elimina el botón Comenzar Proyecto */}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.to}
                    className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {/* Submenu móvil */}
                  {item.hasDropdown && (
                    <div className="ml-4 mt-1 space-y-1">
                      {serviceRoutes.map((service) => (
                        <Link
                          key={service.name}
                          to={service.to}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
