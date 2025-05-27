import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(userData: Partial<User>): Promise<User> {
    const { username, password } = userData;

    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password!, 10);

    const user = new this.userModel({
      ...userData,
      password: hashedPassword,
      isActive: true,
    });

    return user.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filters: Record<string, any> = {}
  ): Promise<{ users: User[]; total: number }> {
    const skip = (page - 1) * limit;

    const query = this.userModel.find(filters);

    const users = await query
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.userModel.countDocuments(filters).exec();

    return { users, total };
  }
  async getLastRegisteredUser(): Promise<User | null> {
    return this.userModel
      .findOne()
      .sort({ createdAt: -1 })
      .exec();
  }
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
  async toggleUserStatus(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isActive = !user.isActive;
    return user.save();
  }
  async getAllFirstNames(): Promise<string[]> {
    return this.userModel.distinct('personalData.firstName').exec();
  }
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user || !user.isActive) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

}