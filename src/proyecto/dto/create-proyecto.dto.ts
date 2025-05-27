import { IsArray, IsDate, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: 'en_progreso' | 'completado' | 'cancelado';

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress?: number;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsDate()
  @IsOptional()
  actualEndDate?: Date;

  @IsArray()
  @IsOptional()
  contractors?: Array<{ name: string; contact: string }>;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  responsables?: string[];

  @IsString()
  @IsOptional()
  observaciones?: string;
}