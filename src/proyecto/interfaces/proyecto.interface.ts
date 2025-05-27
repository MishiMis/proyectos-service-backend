import { Document } from 'mongoose';

export interface Contractor {
  name: string;
  contact: string;
}

export interface Proyecto extends Document {
  name: string;
  description?: string;
  status: 'en_progreso' | 'completado' | 'cancelado';
  progress: number;
  startDate?: Date;
  endDate?: Date;
  actualEndDate?: Date;
  contractors: Contractor[];
  responsables: string[];
  observaciones?: string;
  createdAt: Date;
  updatedAt: Date;
}