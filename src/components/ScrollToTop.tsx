import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que hace scroll al inicio de la página
 * cada vez que cambia la ruta
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hacer scroll al inicio de la página
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Para un desplazamiento suave
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
