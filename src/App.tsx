import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import Admision from './pages/admision';
import Rastreo from './pages/Rastreo';
import type { UsuarioSesion } from './types/serpost';

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const raw = localStorage.getItem('serpost_user');
  const user: UsuarioSesion | null = raw ? JSON.parse(raw) : null;

  if (!user) return <Navigate to="/login" replace />;

  const logout = () => {
    localStorage.removeItem('serpost_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-blue-900 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold tracking-wide">SERPOST</span>
          <nav className="flex gap-4 text-sm">
            <Link to="/admision" className="hover:underline">Admisión de Envíos</Link>
            <Link to="/rastreo" className="hover:underline">Rastreo / Tracking</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="bg-blue-800 px-2 py-1 rounded">{user.nombre} ({user.rol})</span>
          <button onClick={logout} className="underline hover:text-slate-200 cursor-pointer">
            Salir
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admision" element={<Layout><Admision /></Layout>} />
        <Route path="/rastreo" element={<Layout><Rastreo /></Layout>} />
        <Route path="*" element={<Navigate to="/admision" replace />} />
      </Routes>
    </BrowserRouter>
  );
}