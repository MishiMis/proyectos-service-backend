import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Patch, 
  Query,
  HttpStatus,
  HttpCode,
  NotFoundException 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('isActive') isActive?: boolean
  ) {
    const filters: Record<string, any> = {};
    if (isActive !== undefined) {
      filters.isActive = isActive;
    }
    
    return this.usersService.findAll(page, limit, filters);
  }
  @Get('firstnames')
  async getAllFirstNames(): Promise<string[]> {
    return this.usersService.getAllFirstNames();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  @Patch(':id/toggle-status')
  async toggleStatus(@Param('id') id: string) {
    return this.usersService.toggleUserStatus(id);
  }
}