export interface Cliente {
  clienteId?: number;
  nombres: string;
  documento: string;
  telefono: string;
  correo: string;
  estado?: string;
}

export interface Destinatario {
  destinatarioId?: number;
  nombres: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}

export interface LineaNegocio {
  lineaId: number;
  nombre: 'Personal' | 'Empresarial' | 'Encomienda' | 'Filatelia' | string;
  descripcion?: string;
  estado?: string;
}

export interface Paquete {
  paqueteId?: number;
  envioId?: number;
  pesoKg: number;
  contenido: string;
}

export interface Tarifa {
  tarifaId?: number;
  envioId?: number;
  monto: number;
  fechaCalculo?: string;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'RECHAZADA' | string;
}

export interface Pago {
  pagoId?: number;
  envioId: number;
  metodoPago: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA' | string;
  monto: number;
  fechaPago?: string;
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'RECHAZADO' | string;
  nroIntento: number;
}

export interface Comprobante {
  comprobanteId: number;
  pagoId: number;
  numero: string;
  fechaEmision: string;
  total: number;
}

export interface Guia {
  guiaId: number;
  envioId: number;
  codigoGuia: string;
  fechaGeneracion: string;
}

export interface EventoRastreo {
  eventoId: number;
  guiaId?: number;
  estado: string;
  fechaHora: string;
  descripcion?: string;
}

export interface Envio {
  envioId?: number;
  clienteId?: number;
  destinatarioId?: number;
  lineaId: number;
  fechaAdmision?: string;
  estado: string;
  cliente?: Cliente;
  destinatario?: Destinatario;
  paquete?: Paquete;
  tarifa?: Tarifa;
  guia?: Guia;
  eventos?: EventoRastreo[];
}

export interface UsuarioSesion {
  id: number;
  nombre: string;
  correo: string;
  rol: 'CLIENTE' | 'EJECUTIVO_ADMISION' | 'OPERADOR_CCPL' | 'REPARTIDOR' | string;
  token?: string;
}