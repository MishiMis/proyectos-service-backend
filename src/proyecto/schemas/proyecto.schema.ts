import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Proyecto extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: ['en_progreso', 'completado', 'cancelado'],
    default: 'en_progreso'
  })
  status: string;

  @Prop({ 
    type: Number,
    default: 0,
    min: 0,
    max: 100
  })
  progress: number;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: Date })
  actualEndDate: Date;

  @Prop([{
    name: String,
    contact: String
  }])
  contractors: {
    name: string;
    contact: string;
  }[];

  @Prop([String])
  responsables: string[];

  @Prop()
  observaciones: string;
}

export type ProyectoDocument = Proyecto & Document;
export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);