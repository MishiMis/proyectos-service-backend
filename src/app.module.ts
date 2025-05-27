import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ActividadModule } from './actividad/actividad.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://Admin:%40admin%40@practicaslaborales.ka5xbj5.mongodb.net/gestor?retryWrites=true&w=majority&appName=practicasLaborales"), UsersModule, AuthModule, ProyectoModule, ActividadModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
