import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto, ProyectoDocument } from './schemas/proyecto.schema';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Actividad } from '../actividad/schemas/actividad.schema';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectModel(Proyecto.name) private proyectoModel: Model<ProyectoDocument>,
    @InjectModel(Actividad.name) private actividadModel: Model<Actividad>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    if (createProyectoDto.progress !== undefined) {
      delete createProyectoDto.progress;
    }
    
    const createdProyecto = new this.proyectoModel(createProyectoDto);
    return createdProyecto.save();
  }

  async findAll(): Promise<Proyecto[]> {
    return this.proyectoModel.find().exec();
  }

  async findOne(id: string): Promise<Proyecto | null> {
    return this.proyectoModel.findById(id).exec();
  }

  async update(id: string, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto | null> {
    if (updateProyectoDto.progress !== undefined) {
      delete updateProyectoDto.progress;
    }
    
    return this.proyectoModel.findByIdAndUpdate(id, updateProyectoDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Proyecto | null> {
    await this.actividadModel.deleteMany({ projectId: id }).exec();
    return this.proyectoModel.findByIdAndDelete(id).exec();
  }

  async calculateProgress(projectId: string): Promise<number> {
    const actividades = await this.actividadModel.find({ projectId }).exec();
    
    if (actividades.length === 0) {
      return 0;
    }

    const completadas = actividades.filter(a => a.status === 'completada').length;
    const progress = Math.round((completadas / actividades.length) * 100);
    
    await this.proyectoModel.findByIdAndUpdate(projectId, { progress }).exec();
    
    return progress;
  }
  
}