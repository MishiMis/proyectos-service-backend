import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Actividad } from './schemas/actividad.schema';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { ProyectoService } from '../proyecto/proyecto.service';

@Injectable()
export class ActividadService {
  constructor(
    @InjectModel(Actividad.name) private actividadModel: Model<Actividad>,
    private proyectoService: ProyectoService,
  ) { }

  async create(createActividadDto: CreateActividadDto): Promise<Actividad> {
    const createdActividad = new this.actividadModel(createActividadDto);
    const savedActividad = await createdActividad.save();

    await this.proyectoService.calculateProgress(createActividadDto.projectId.toString());

    return savedActividad;
  }

  async findAllByProject(projectId: string): Promise<Actividad[]> {
    return this.actividadModel.find({ projectId }).exec();
  }

  async toggleStatus(id: string): Promise<Actividad> {
    const actividad = await this.actividadModel.findById(id).exec();
    if (!actividad) {
      throw new Error('Actividad no encontrada');
    }
    actividad.status = actividad.status === 'en_progreso' ? 'completada' : 'en_progreso';
    if (actividad.status === 'completada' && actividad.horas_reales === 0) {
      actividad.horas_reales = actividad.horas_estimadas;
    }

    const updatedActividad = await actividad.save();

    await this.proyectoService.calculateProgress(actividad.projectId.toString());

    return updatedActividad;
  }


}