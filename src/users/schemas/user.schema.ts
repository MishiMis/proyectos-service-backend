import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    dni: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true }
  }, required: true })
  personalData: {
    firstName: string;
    lastName: string;
    address?: string;
    phone?: string;
    dni: string;
    birthDate: Date;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);