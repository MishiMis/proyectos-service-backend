import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Proyecto } from '../../proyecto/schemas/proyecto.schema';

export type ActividadDocument = Actividad & Document;

@Schema({ timestamps: true })
export class Actividad {
  @Prop({
    type: Types.ObjectId,
    ref: 'Proyecto',
    required: true
  })
  projectId: Types.ObjectId | Proyecto;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: ['bajo', 'medio', 'alto'],
    default: 'medio'
  })
  priority: string;

  @Prop({
    type: String,
    enum: ['no_iniciada', 'en_progreso', 'completada'],
    default: 'no_iniciada'
  })
  status: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop([String])
  asignados: string[];

  @Prop()
  horas_estimadas: number;

  @Prop()
  horas_reales: number;
}

export const ActividadSchema = SchemaFactory.createForClass(Actividad);