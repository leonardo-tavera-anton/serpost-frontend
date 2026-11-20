import { useState } from 'react';
import type { Cliente, Destinatario, Paquete, Tarifa, Pago, Guia } from '../types/serpost';

export default function Admision() {
  const [paso, setPaso] = useState<'DATOS' | 'COTIZACION' | 'COMPLETADO'>('DATOS');

  const [remitente, setRemitente] = useState<Cliente>({
    nombres: '',
    documento: '',
    telefono: '',
    correo: '',
  });

  const [destinatario, setDestinatario] = useState<Destinatario>({
    nombres: '',
    telefono: '',
    direccion: '',
    ciudad: '',
  });

  const [lineaNegocio, setLineaNegocio] = useState('Encomienda');
  const [paquete, setPaquete] = useState<Paquete>({ pesoKg: 1, contenido: '' });
  const [tarifa, setTarifa] = useState<Tarifa | null>(null);
  const [metodoPago, setMetodoPago] = useState<Pago['metodoPago']>('EFECTIVO');
  const [guiaGenerada, setGuiaGenerada] = useState<Guia | null>(null);

  const handleCotizar = (e: React.FormEvent) => {
    e.preventDefault();
    const basePorLinea: Record<string, number> = {
      Personal: 10,
      Empresarial: 15,
      Encomienda: 18,
      Filatelia: 12,
    };
    const montoCalculado = (basePorLinea[lineaNegocio] || 15) + paquete.pesoKg * 4.5;

    setTarifa({
      tarifaId: Date.now(),
      monto: Number(montoCalculado.toFixed(2)),
      estado: 'PENDIENTE',
    });
    setPaso('COTIZACION');
  };

  const handleConfirmarPago = () => {
    if (!tarifa) return;
    setTarifa({ ...tarifa, estado: 'CONFIRMADA' });
    setGuiaGenerada({
      guiaId: 101,
      envioId: 5001,
      codigoGuia: `SP-${Math.floor(100000 + Math.random() * 900000)}-PE`,
      fechaGeneracion: new Date().toISOString().slice(0, 10),
    });
    setPaso('COMPLETADO');
  };

  const reiniciar = () => {
    setPaso('DATOS');
    setTarifa(null);
    setGuiaGenerada(null);
    setPaquete({ pesoKg: 1, contenido: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Admisión y Venta de Envíos</h2>
        <p className="text-xs text-slate-500">Registro, cotización, cobro y emisión de código de guía</p>
      </div>

      {paso === 'DATOS' && (
        <form onSubmit={handleCotizar} className="bg-white p-5 rounded-lg border border-slate-200 space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-3 border-b pb-1">1. Datos del Remitente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                required
                placeholder="Nombres completos"
                value={remitente.nombres}
                onChange={(e) => setRemitente({ ...remitente, nombres: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
              <input
                required
                placeholder="DNI / RUC"
                value={remitente.documento}
                onChange={(e) => setRemitente({ ...remitente, documento: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
              <input
                required
                placeholder="Teléfono"
                value={remitente.telefono}
                onChange={(e) => setRemitente({ ...remitente, telefono: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
              <input
                required
                type="email"
                placeholder="Correo electrónico"
                value={remitente.correo}
                onChange={(e) => setRemitente({ ...remitente, correo: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-3 border-b pb-1">2. Datos del Destinatario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                required
                placeholder="Nombres completos"
                value={destinatario.nombres}
                onChange={(e) => setDestinatario({ ...destinatario, nombres: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
              <input
                required
                placeholder="Teléfono"
                value={destinatario.telefono}
                onChange={(e) => setDestinatario({ ...destinatario, telefono: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
              <input
                required
                placeholder="Dirección de entrega"
                value={destinatario.direccion}
                onChange={(e) => setDestinatario({ ...destinatario, direccion: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
              <input
                required
                placeholder="Ciudad / Destino"
                value={destinatario.ciudad}
                onChange={(e) => setDestinatario({ ...destinatario, ciudad: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-3 border-b pb-1">3. Características del Paquete</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select
                value={lineaNegocio}
                onChange={(e) => setLineaNegocio(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded text-sm bg-white"
              >
                <option value="Personal">Personal</option>
                <option value="Empresarial">Empresarial</option>
                <option value="Encomienda">Encomienda</option>
                <option value="Filatelia">Filatelia</option>
              </select>

              <input
                required
                type="number"
                step="0.1"
                min="0.1"
                placeholder="Peso (kg)"
                value={paquete.pesoKg}
                onChange={(e) => setPaquete({ ...paquete, pesoKg: parseFloat(e.target.value) || 0 })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />

              <input
                required
                placeholder="Contenido declarado"
                value={paquete.contenido}
                onChange={(e) => setPaquete({ ...paquete, contenido: e.target.value })}
                className="px-3 py-2 border border-slate-300 rounded text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium rounded cursor-pointer"
            >
              Validar y Calcular Tarifa
            </button>
          </div>
        </form>
      )}

      {paso === 'COTIZACION' && tarifa && (
        <div className="bg-white p-5 rounded-lg border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-800">Confirmación de Tarifa y Cobro</h3>
          <div className="bg-slate-50 p-4 rounded border border-slate-200 text-sm space-y-1">
            <p><span className="font-medium">Remitente:</span> {remitente.nombres} ({remitente.documento})</p>
            <p><span className="font-medium">Destinatario:</span> {destinatario.nombres} — {destinatario.ciudad}</p>
            <p><span className="font-medium">Servicio:</span> {lineaNegocio} | <span className="font-medium">Peso:</span> {paquete.pesoKg} kg</p>
            <p className="text-lg font-bold text-blue-900 pt-2">Total a pagar: S/ {tarifa.monto.toFixed(2)}</p>
          </div>

          <div className="max-w-xs">
            <label className="block text-sm font-medium text-slate-700 mb-1">Método de pago</label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white"
            >
              <option value="EFECTIVO">Efectivo</option>
              <option value="TARJETA">Tarjeta</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPaso('DATOS')}
              className="px-4 py-2 border border-slate-300 rounded text-sm hover:bg-slate-50 cursor-pointer"
            >
              Volver y editar
            </button>
            <button
              type="button"
              onClick={handleConfirmarPago}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded cursor-pointer"
            >
              Confirmar Pago y Generar Guía
            </button>
          </div>
        </div>
      )}

      {paso === 'COMPLETADO' && guiaGenerada && (
        <div className="bg-white p-6 rounded-lg border border-emerald-300 space-y-3">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded">
            Comprobante Emitido y Seguimiento Habilitado
          </span>
          <h3 className="text-lg font-bold text-slate-800">Envío registrado correctamente</h3>
          <p className="text-sm text-slate-600">
            Código de Guía Único: <span className="font-mono font-bold text-base text-blue-900">{guiaGenerada.codigoGuia}</span>
          </p>
          <p className="text-xs text-slate-500">
            Remitente: {remitente.nombres} | Destinatario: {destinatario.nombres} ({destinatario.ciudad})
          </p>
          <p className="text-xs text-slate-500">Fecha de emisión: {guiaGenerada.fechaGeneracion}</p>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded hover:bg-slate-50 cursor-pointer"
            >
              Imprimir Comprobante
            </button>
            <button
              type="button"
              onClick={reiniciar}
              className="px-4 py-2 bg-blue-800 text-white text-sm rounded hover:bg-blue-900 cursor-pointer"
            >
              Registrar nuevo envío
            </button>
          </div>
        </div>
      )}
    </div>
  );
}