import { IsMongoId, isNotEmpty, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
    @IsMongoId({ message: "_id invalid!!!" })
    @IsNotEmpty({ message: "_id not empty!!!" })
    _id: string

    @IsNotEmpty({ message: "Name not empty!!!" })
    name: string;

    @IsOptional()
    @IsPhoneNumber("VN", { message: "Phone number is wrong format!!!" })
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;
}
