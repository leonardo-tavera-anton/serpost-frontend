import { useState, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Admision from './pages/Admision';
import Rastreo from './pages/Rastreo';
import Logistica from './pages/Logistica';
import type { UsuarioSesion } from './types/serpost';

function leerUsuario(): UsuarioSesion | null {
  const raw = localStorage.getItem('serpost_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UsuarioSesion;
  } catch {
    return null;
  }
}

function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UsuarioSesion | null>(() => leerUsuario());

  const logout = () => {
    localStorage.removeItem('serpost_user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header user={user} onLogout={logout} />
      <main className="max-w-5xl mx-auto p-6">{children}</main>
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
        <Route path="/logistica" element={<Layout><Logistica /></Layout>} />
        <Route path="*" element={<Navigate to="/admision" replace />} />
      </Routes>
    </BrowserRouter>
  );
}