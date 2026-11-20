import { Link, NavLink, useNavigate } from 'react-router-dom';
import type { UsuarioSesion } from '../types/serpost';

interface HeaderProps {
  user: UsuarioSesion | null;
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('serpost_user');
    }
    navigate('/login');
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-2.5 py-1 rounded text-sm transition-colors ${
      isActive ? 'bg-blue-700 text-white font-semibold' : 'text-blue-100 hover:bg-blue-800 hover:text-white'
    }`;

  return (
    <header className="bg-blue-900 text-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <Link to="/admision" className="font-bold tracking-wide text-base">
            SERPOST SOA
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink to="/admision" className={navClass}>
              Admisión
            </NavLink>
            <NavLink to="/rastreo" className={navClass}>
              Rastreo
            </NavLink>
            <NavLink to="/logistica" className={navClass}>
              Logística
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {user ? (
            <>
              <span className="bg-blue-800 px-2.5 py-1 rounded">
                {user.nombre} · {user.rol}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="underline text-blue-100 hover:text-white cursor-pointer"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded font-medium"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}