import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsArray, IsDate, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';


export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  fecha_limite?: Date;
}