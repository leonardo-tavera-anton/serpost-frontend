import { api } from './client';
import type {
  Cliente,
  Destinatario,
  Paquete,
  Tarifa,
  Pago,
  Guia,
  EventoRastreo,
} from '../types/serpost';

export const serpostApi = {
  validarCliente: (documento: string) =>
    api.post('/clientes/validar', { documento }),

  cotizarEnvio: (payload: {
    remitente: Cliente;
    destinatario: Destinatario;
    lineaNegocio: string;
    paquete: Paquete;
  }) => api.post<{ tarifa: Tarifa; envioId: number }>('/envios/cotizar', payload),

  confirmarPagoYGenerarGuia: (payload: {
    envioId: number;
    tarifaId: number;
    metodoPago: Pago['metodoPago'];
    monto: number;
  }) => api.post<{ guia: Guia; comprobanteNumero: string }>('/cobros/confirmar', payload),

  consultarRastreo: (codigoGuia: string) =>
    api.get<{ guia: Guia; eventos: EventoRastreo[] }>(`/rastreo/${codigoGuia}`),

  registrarEventoLogistico: (
    codigoGuia: string,
    payload: { estado: string; descripcion: string }
  ) => api.post<EventoRastreo>(`/rastreo/${codigoGuia}/eventos`, payload),
};