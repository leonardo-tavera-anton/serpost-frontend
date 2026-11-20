import { useState } from 'react';

interface RegistroDespacho {
  id: number;
  codigoGuia: string;
  zona: string;
  unidad: string;
  conductor: string;
  estado: string;
}

export default function Logistica() {
  const [codigoGuia, setCodigoGuia] = useState('');
  const [zona, setZona] = useState('Chimbote / Nuevo Chimbote');
  const [unidad, setUnidad] = useState('TRK-01');
  const [conductor, setConductor] = useState('');
  const [lista, setLista] = useState<RegistroDespacho[]>([]);

  const handleAsignar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigoGuia.trim() || !conductor.trim()) return;

    setLista((prev) => [
      ...prev,
      {
        id: Date.now(),
        codigoGuia: codigoGuia.toUpperCase(),
        zona,
        unidad,
        conductor,
        estado: 'MANIFIESTO_EMITIDO',
      },
    ]);
    setCodigoGuia('');
    setConductor('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Logística y Despacho (CCPL)</h2>
        <p className="text-xs text-slate-500">Agrupación por zona, asignación de unidad/conductor y manifiesto</p>
      </div>

      <form onSubmit={handleAsignar} className="bg-white p-5 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          required
          placeholder="Código de guía (ej. SP-123456-PE)"
          value={codigoGuia}
          onChange={(e) => setCodigoGuia(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded text-sm font-mono"
        />
        <input
          required
          placeholder="Zona / Ruta"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded text-sm"
        />
        <input
          required
          placeholder="Unidad (ej. TRK-01)"
          value={unidad}
          onChange={(e) => setUnidad(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded text-sm"
        />
        <div className="flex gap-2">
          <input
            required
            placeholder="Conductor"
            value={conductor}
            onChange={(e) => setConductor(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium rounded cursor-pointer"
          >
            Despachar
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Guía</th>
              <th className="px-4 py-2">Zona</th>
              <th className="px-4 py-2">Unidad</th>
              <th className="px-4 py-2">Conductor</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {lista.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-slate-400">
                  Sin despachos registrados aún.
                </td>
              </tr>
            ) : (
              lista.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 font-mono font-semibold">{item.codigoGuia}</td>
                  <td className="px-4 py-2">{item.zona}</td>
                  <td className="px-4 py-2">{item.unidad}</td>
                  <td className="px-4 py-2">{item.conductor}</td>
                  <td className="px-4 py-2 text-xs font-medium text-blue-800">{item.estado}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}