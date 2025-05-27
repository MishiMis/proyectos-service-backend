import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActividadController } from './actividad.controller';
import { ActividadService } from './actividad.service';
import { Actividad, ActividadSchema } from './schemas/actividad.schema';
import { ProyectoModule } from '../proyecto/proyecto.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Actividad.name, schema: ActividadSchema }]),
    forwardRef(() => ProyectoModule),
    forwardRef(() => TaskModule)
  ],
  controllers: [ActividadController],
  providers: [ActividadService],
  exports: [ActividadService, MongooseModule]
})
export class ActividadModule {}