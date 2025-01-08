import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword } from '@/utils/utils';
import aqp from 'api-query-params';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)
  private userModel: Model<User>
  ) { }

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email })
    if (user) return true
    return false
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto

    //check email 
    const isExist = await this.isEmailExist(email)
    if (isExist) {
      throw new BadRequestException(`Email ${email} is exist. Please try email other!!!`)
    }

    //hash password
    const hash = await hashPassword(password)
    const user = await this.userModel.create({
      name: name,
      email: email,
      password: hash
    })

    return {
      _id: user._id
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);

    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize

    if (!current) current = 1
    if (!pageSize) pageSize = 10

    //Tính tổng số lượng
    const totalItems = (await this.userModel.find(filter)).length;
    //Tính tổng số trang
    const totalPages = Math.ceil(totalItems / pageSize)

    const skip = (+current - 1) * (+pageSize)

    const result = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select("-password")
      .sort(sort as any)

    return {
      result,
      totalPages
    };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select(["-password"])
    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(updateUserDto._id, updateUserDto)
    return user;
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      return await this.userModel.findByIdAndDelete(id)
    } else {
      throw new BadRequestException("Invalid id!!!")
    }
  }

  async register(registerDto: CreateAuthDto) {
    try {
      const { name, email, password } = registerDto

      //check email 
      const isExist = await this.isEmailExist(email)
      if (isExist) {
        throw new BadRequestException(`Email ${email} is exist. Please try email other!!!`)
      }

      //hash password
      const hash = await hashPassword(password)
      const user = await this.userModel.create({
        name: name,
        email: email,
        password: hash,
        codeId: uuidv4(),
        codeExpired: dayjs().add(1, 'minute')
      })
      return {
        _id: user._id
      }
    } catch (error) {
      console.log(error);
      return error.response
    }
  }
}
