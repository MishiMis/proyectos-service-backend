import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      status: createTaskDto.status || 'pendiente',
      prioridad: createTaskDto.prioridad || 'medio'
    });
    return createdTask.save();
  }

  async findAllByActivity(activityId: string): Promise<Task[]> {
    return this.taskModel.find({ activityId }).sort({ fecha_limite: 1 }).exec();
  }




}