import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  create(@Body() createActividadDto: CreateActividadDto) {
    return this.actividadService.create(createActividadDto);
  }

  @Get('proyecto/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.actividadService.findAllByProject(projectId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateActividadDto: UpdateActividadDto) {
    return this.actividadService.update(id, updateActividadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadService.remove(id);
  }
}