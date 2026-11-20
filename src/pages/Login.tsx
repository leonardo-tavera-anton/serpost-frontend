import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UsuarioSesion } from '../types/serpost';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<UsuarioSesion['rol']>('EJECUTIVO_ADMISION');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Cuando conectes tu back, reemplaza esto por: const { data } = await api.post('/auth/login', { correo, password });
    const mockUser: UsuarioSesion = {
      id: 1,
      nombre: correo.split('@')[0] || 'Usuario Serpost',
      correo,
      rol,
      token: 'demo-token',
    };
    localStorage.setItem('serpost_user', JSON.stringify(mockUser));
    navigate('/admision');
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold text-slate-800 mb-1">SERPOST SOA</h1>
      <p className="text-sm text-slate-500 mb-5">Acceso al sistema postal</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Correo</label>
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="operador@serpost.com.pe"
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Rol de sesión</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white"
          >
            <option value="EJECUTIVO_ADMISION">Ejecutivo de Admisión[cite: 12]</option>
            <option value="OPERADOR_CCPL">Operador Postal (CCPL)[cite: 35]</option>
            <option value="REPARTIDOR">Repartidor[cite: 35]</option>
            <option value="CLIENTE">Cliente[cite: 12]</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded text-sm cursor-pointer"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}