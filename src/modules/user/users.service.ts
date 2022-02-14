import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Tạo hoặc cập nhật tài khoản người dùng mỗi khi đăng nhập và xác thực FPT.ID thành công
   * @param email 
   * @param userUpdateDto 
   * @returns 
   */
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

  /**
   * Check/Tìm user theo id
   * @param userId 
   * @returns 
   */
  async findUserById(userId: string): Promise<User> {
    const user = await this.userModel.findOne({
      _id: userId,
    });
    if (!user) {
      throw new NotFoundException('User does not exist!')
    }
    return user;
  }
}
