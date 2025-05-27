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
  ) {}

  async create(createActividadDto: CreateActividadDto): Promise<Actividad> {
    const createdActividad = new this.actividadModel(createActividadDto);
    const savedActividad = await createdActividad.save();
    
    await this.proyectoService.calculateProgress(createActividadDto.projectId.toString());
    
    return savedActividad;
  }

  async findAllByProject(projectId: string): Promise<Actividad[]> {
    return this.actividadModel.find({ projectId }).exec();
  }

  async update(id: string, updateActividadDto: UpdateActividadDto): Promise<Actividad | null> {
    const updatedActividad = await this.actividadModel
      .findByIdAndUpdate(id, updateActividadDto, { new: true })
      .exec();
    
    if (updatedActividad && updateActividadDto.status) {
      await this.proyectoService.calculateProgress(updatedActividad.projectId.toString());
    }
    
    return updatedActividad;
  }

  async remove(id: string): Promise<Actividad | null> {
    const actividad = await this.actividadModel.findByIdAndDelete(id).exec();
    
    if (actividad) {
      await this.proyectoService.calculateProgress(actividad.projectId.toString());
    }
    
    return actividad;
  }
}