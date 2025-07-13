// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(email: string, passwordHash: string): Promise<User> {
  const user = new this.userModel({ email, passwordHash });
  return user.save();
}


  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
  
}
