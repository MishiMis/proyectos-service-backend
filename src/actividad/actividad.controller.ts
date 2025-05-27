import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) { }

  @Post()
  create(@Body() createActividadDto: CreateActividadDto) {
    return this.actividadService.create(createActividadDto);
  }

  @Get('proyecto/:projectId')
  findAllByProject(@Param('projectId') projectId: string) {
    return this.actividadService.findAllByProject(projectId);
  }
  @Patch(':id/toggle-status')
  toggleStatus(@Param('id') id: string) {
    return this.actividadService.toggleStatus(id);
  }

}