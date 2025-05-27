import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Actividad } from '../../actividad/schemas/actividad.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({
    type: Types.ObjectId,
    ref: 'Actividad',
    required: true
  })
  activityId: Types.ObjectId | Actividad;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: ['bajo', 'medio', 'alto'],
    default: 'medio'
  })
  prioridad: string;

  @Prop({ required: true, type: Date })
  fecha_limite: Date;

  @Prop([String])
  asignados: string[];

  @Prop()
  instrucciones: string;

  @Prop({
    type: String,
    enum: ['pendiente', 'en_progreso', 'revision', 'completado'],
    default: 'pendiente'
  })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);