import { IsArray, IsDate, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsMongoId()
  activityId: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['bajo', 'medio', 'alto'])
  @IsOptional()
  prioridad?: 'bajo' | 'medio' | 'alto';

  @IsDate()
  fecha_limite: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  asignados?: string[];

  @IsString()
  @IsOptional()
  instrucciones?: string;

  @IsEnum(['pendiente', 'en_progreso', 'revision', 'completado'])
  @IsOptional()
  status?: 'pendiente' | 'en_progreso' | 'revision' | 'completado';
}