import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProyectoController } from './proyecto.controller';
import { ProyectoService } from './proyecto.service';
import { Proyecto, ProyectoSchema } from './schemas/proyecto.schema';
import { ActividadModule } from '../actividad/actividad.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proyecto.name, schema: ProyectoSchema }]),
    forwardRef(() => ActividadModule)
  ],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports: [ProyectoService]
})
export class ProyectoModule {}