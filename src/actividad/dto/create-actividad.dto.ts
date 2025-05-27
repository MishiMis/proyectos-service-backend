import { IsArray, IsDate, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateActividadDto {
  @IsMongoId()
  projectId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['bajo', 'medio', 'alto'])
  @IsOptional()
  priority?: 'bajo' | 'medio' | 'alto';

  @IsEnum(['no_iniciada', 'en_progreso', 'completada'])
  @IsOptional()
  status?: 'no_iniciada' | 'en_progreso' | 'completada';

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  asignados?: string[];

  @IsNumber()
  @IsOptional()
  horas_estimadas?: number;

  @IsNumber()
  @IsOptional()
  horas_reales?: number;
}