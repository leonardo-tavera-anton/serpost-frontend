import { useState } from 'react';
import type { EventoRastreo, UsuarioSesion } from '../types/serpost';

export default function Rastreo() {
  const [codigo, setCodigo] = useState('');
  const [eventos, setEventos] = useState<EventoRastreo[]>([]);
  const [buscado, setBuscado] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState('CLASIFICADO_CCPL');
  const [descripcion, setDescripcion] = useState('');

  const rawUser = localStorage.getItem('serpost_user');
  const user: UsuarioSesion | null = rawUser ? JSON.parse(rawUser) : null;
  const esOperativo = user && user.rol !== 'CLIENTE';

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim()) return;
    // Aquí irá: const { data } = await api.get(`/rastreo/${codigo}`);
    setEventos([
      {
        eventoId: 1,
        estado: 'ADMITIDO',
        fechaHora: '2026-10-15 09:30',
        descripcion: 'Envío admitido y pago confirmado en ventanilla.',
      },
      {
        eventoId: 2,
        estado: 'EN_TRANSITO_CCPL',
        fechaHora: '2026-10-15 14:15',
        descripcion: 'Paquete recibido y escaneado en Centro de Clasificación Postal.',
      },
    ]);
    setBuscado(true);
  };

  const handleAgregarEvento = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá: await api.post(`/rastreo/${codigo}/eventos`, { estado: nuevoEstado, descripcion })
    const nuevo: EventoRastreo = {
      eventoId: Date.now(),
      estado: nuevoEstado,
      fechaHora: new Date().toISOString().replace('T', ' ').slice(0, 16),
      descripcion: descripcion || `Actualización de estado: ${nuevoEstado}`,
    };
    setEventos([...eventos, nuevo]);
    setDescripcion('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Consulta de Rastreo y Trazabilidad</h2>
        <p className="text-xs text-slate-500">Historial de eventos del envío por código de guía[cite: 16, 19]</p>
      </div>

      {/* Buscador */}
      <form onSubmit={handleBuscar} className="flex gap-2">
        <input
          required
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.toUpperCase())}
          placeholder="Ej: SP-482910-PE"
          className="flex-1 max-w-sm px-3 py-2 bg-white border border-slate-300 rounded text-sm font-mono"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium rounded cursor-pointer"
        >
          Buscar Guía
        </button>
      </form>

      {buscado && (
        <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-5">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-sm font-semibold text-slate-700">
              Guía: <span className="font-mono text-blue-900">{codigo}</span>
            </span>
            <span className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded font-medium">
              Estado actual: {eventos[eventos.length - 1]?.estado}
            </span>
          </div>

          {/* Línea de tiempo */}
          <ul className="space-y-3 border-l-2 border-blue-800 ml-2 pl-4">
            {eventos.map((ev) => (
              <li key={ev.eventoId} className="text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">{ev.estado}</span>
                  <span className="text-xs text-slate-400">{ev.fechaHora}</span>
                </div>
                {ev.descripcion && <p className="text-xs text-slate-600">{ev.descripcion}</p>}
              </li>
            ))}
          </ul>

          {/* Panel operativo para Proceso 2 (CCPL / Repartidor) */}
          {esOperativo && (
            <form onSubmit={handleAgregarEvento} className="pt-4 border-t border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500">
                Registrar nuevo hito logístico ({user.rol})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded text-sm bg-white"
                >
                  <option value="CLASIFICADO_CCPL">Clasificado en CCPL (B4-B6)[cite: 37]</option>
                  <option value="EN_RUTA_REPARTO">En ruta de reparto (B15)[cite: 37]</option>
                  <option value="ENTREGADO">Entregado con constancia (B16)[cite: 38]</option>
                  <option value="REPROGRAMADO">Entrega fallida - Reprogramado (B18-C)[cite: 38]</option>
                  <option value="DEVUELTO_REMITENTE">Devuelto al remitente (B18-B)[cite: 38]</option>
                </select>
                <input
                  placeholder="Observación o detalle"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm rounded cursor-pointer"
                >
                  Actualizar Estado
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}