import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async createOrUpdateUserByEmail(
        email: string,
        userUpdateDto: UserUpdateDto,
      ): Promise<User> {
        return this.userModel.findOneAndUpdate({ email: email }, userUpdateDto, {
          upsert: true,
          setDefaultsOnInsert: true,
          new: true,
        });
      }
}
