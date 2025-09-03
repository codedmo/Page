import { Link } from 'react-router-dom';
import { useState, useEffect } from "react"
import type { JSX } from "react"

import { Menu, X, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Tipo para elementos de navegación dinámicos
interface NavItem {
  name: string;
  to?: string;
  hasDropdown?: boolean;
  children?: NavItem[];
  level?: number;
}

export default function Navbar() {
  // Estado para manejar dropdowns dinámicos
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  
  // Estado para manejar timeouts de hover
  const [hoverTimeouts, setHoverTimeouts] = useState<Map<string, NodeJS.Timeout>>(new Map());
  
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

  // Cleanup de timeouts al desmontar el componente
  useEffect(() => {
    return () => {
      hoverTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [hoverTimeouts]);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para manejar dropdowns de manera dinámica
  const toggleDropdown = (itemKey: string) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  const openDropdown = (itemKey: string) => {
    // Limpiar cualquier timeout existente para este item
    const existingTimeout = hoverTimeouts.get(itemKey);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }
    
    // Cerrar dropdowns de niveles diferentes o hermanos del mismo nivel
    const currentLevel = parseInt(itemKey.split('-')[2]);
    
    setOpenDropdowns(prev => {
      const newSet = new Set<string>();
      
      // Para nivel 0 (menú principal), cerrar todo lo demás
      if (currentLevel === 0) {
        newSet.add(itemKey);
        return newSet;
      }
      
      // Para niveles superiores, mantener solo la cadena de padres
      prev.forEach(key => {
        const level = parseInt(key.split('-')[2]);
        // Mantener solo si es un nivel padre del actual
        if (level < currentLevel) {
          newSet.add(key);
        }
      });
      
      // Agregar el dropdown actual
      newSet.add(itemKey);
      return newSet;
    });
  };

  const closeDropdown = (itemKey: string) => {
    // Limpiar timeout existente si existe
    const existingTimeout = hoverTimeouts.get(itemKey);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }
    
    // Crear nuevo timeout para delay de cierre
    const timeout = setTimeout(() => {
      setOpenDropdowns(prev => {
        const newSet = new Set(prev);
        
        // Cerrar el dropdown actual y todos sus hijos
        const currentLevel = parseInt(itemKey.split('-')[2]);
        
        const keysToRemove = Array.from(prev).filter(key => {
          const level = parseInt(key.split('-')[2]);
          
          // Remover si es el mismo item o un nivel hijo
          return key === itemKey || level > currentLevel;
        });
        
        keysToRemove.forEach(key => newSet.delete(key));
        
        return newSet;
      });
      
      // Limpiar el timeout del mapa
      setHoverTimeouts(prev => {
        const newMap = new Map(prev);
        newMap.delete(itemKey);
        return newMap;
      });
    }, 300); // 300ms de delay antes de cerrar
    
    // Guardar el timeout
    setHoverTimeouts(prev => new Map(prev).set(itemKey, timeout));
  };

  // Función para cerrar todos los dropdowns cuando se sale del área de navegación
  const handleNavMouseLeave = () => {
    // Cerrar todos los dropdowns con un pequeño delay
    setTimeout(() => {
      setOpenDropdowns(new Set());
      // Limpiar todos los timeouts
      hoverTimeouts.forEach(timeout => clearTimeout(timeout));
      setHoverTimeouts(new Map());
    }, 150);
  };

  // Estructura de navegación dinámica con múltiples niveles
  const navItems: NavItem[] = [
    { name: "Inicio", to: "/" },
    { 
      name: "Servicios", 
      to: "/servicios", 
      // hasDropdown: true,
      // children: [
      //   { 
      //     name: "Desarrollo", 
      //     hasDropdown: true,
      //     children: [
      //       { name: "Desarrollo Web", to: "/servicios/desarrollo/web" },
      //       { name: "Desarrollo Móvil", to: "/servicios/desarrollo/movil" },
      //       { name: "Software a Medida", to: "/servicios/desarrollo/software" }
      //     ]
      //   },
      //   { 
      //     name: "Hosting y Infraestructura", 
      //     hasDropdown: true,
      //     children: [
      //       { name: "Alquiler de Hosting", to: "/servicios/hosting" },
      //       { name: "Servidores Dedicados", to: "/servicios/hosting/dedicados" },
      //       { name: "Cloud Computing", to: "/servicios/hosting/cloud" }
      //     ]
      //   },
      //   { 
      //     name: "Integración", 
      //     hasDropdown: true,
      //     children: [
      //       { name: "APIs y Servicios", to: "/servicios/integracion/apis" },
      //       { name: "Servicios de Google", to: "/servicios/integracion/google" },
      //       { name: "Microsoft Exchange", to: "/servicios/integracion/microsoft" }
      //     ]
      //   },
      //   { name: "Consultoría", to: "/servicios/consultoria" }
      // ]
    },
    { name: "Contacto", to: "/contacto" },
  ];

  // Componente recursivo para renderizar elementos de navegación
  const renderNavItem = (item: NavItem, index: number, level: number = 0): JSX.Element => {
    const itemKey = `${item.name}-${index}-${level}`;
    const isOpen = openDropdowns.has(itemKey);

    if (item.hasDropdown && item.children) {
      return (
        <div key={itemKey} className="relative group">
          <div
            className="relative"
            onMouseEnter={() => !isTouchDevice && openDropdown(itemKey)}
            onMouseLeave={() => !isTouchDevice && closeDropdown(itemKey)}
          >
            {level === 0 ? (
              // Elemento de primer nivel (barra principal)
              isTouchDevice ? (
                <button
                  type="button"
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(itemKey);
                  }}
                >
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              ) : (
                item.to ? (
                  <Link
                    to={item.to}
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium"
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                ) : (
                  <div className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium cursor-pointer">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                )
              )
            ) : (
              // Elemento de submenú con dropdown
              <div className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer">
                <span>{item.name}</span>
                <ChevronLeft className="h-4 w-4 opacity-60" />
              </div>
            )}
            
            {/* Dropdown Menu */}
            {isOpen && (
              <div 
                className={`absolute ${level === 0 ? 'top-full right-0 mt-1' : 'top-0 right-full mr-1'} w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 transition-all duration-200 ease-out transform origin-top scale-100 opacity-100 z-50`}
                onMouseEnter={() => !isTouchDevice && openDropdown(itemKey)}
                onMouseLeave={() => !isTouchDevice && closeDropdown(itemKey)}
              >
                {item.children.map((child, childIndex) => (
                  child.hasDropdown && child.children ? (
                    <div 
                      key={`${child.name}-${childIndex}`} 
                      className="relative"
                      onMouseEnter={() => !isTouchDevice && openDropdown(`${child.name}-${childIndex}-${level + 1}`)}
                    >
                      {renderNavItem(child, childIndex, level + 1)}
                    </div>
                  ) : (
                    <Link
                      key={`${child.name}-${childIndex}`}
                      to={child.to || '#'}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      onClick={() => setOpenDropdowns(new Set())}
                    >
                      {child.name}
                    </Link>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <Link
          key={itemKey}
          to={item.to || '#'}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium"
        >
          {item.name}
        </Link>
      );
    }
  };

  // Componente recursivo para navegación móvil
  const renderMobileNavItem = (item: NavItem, index: number, level: number = 0): JSX.Element => {
    const itemKey = `mobile-${item.name}-${index}-${level}`;
    const isOpen = openDropdowns.has(itemKey);
    const indentClass = level > 0 ? `ml-${level * 4}` : '';

    if (item.hasDropdown && item.children) {
      return (
        <div key={itemKey} className={indentClass}>
          <button
            type="button"
            className="flex items-center justify-between w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium focus:outline-none"
            onClick={() => toggleDropdown(itemKey)}
          >
            <span>{item.name}</span>
            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="mt-1 space-y-1">
              {item.children.map((child, childIndex) => 
                renderMobileNavItem(child, childIndex, level + 1)
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Link
          key={itemKey}
          to={item.to || '#'}
          className={`block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium ${indentClass}`}
          onClick={() => setIsMenuOpen(false)}
        >
          {item.name}
        </Link>
      );
    }
  };


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
          <nav 
            className="hidden md:flex items-center space-x-1"
            onMouseLeave={() => !isTouchDevice && handleNavMouseLeave()}
          >
            {navItems.map((item, index) => renderNavItem(item, index))}
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
              {navItems.map((item, index) => renderMobileNavItem(item, index))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
