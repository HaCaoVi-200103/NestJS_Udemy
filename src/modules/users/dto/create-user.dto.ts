import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Name not empty!!!" })
    name: string;

    @IsNotEmpty({ message: "Email not empty!!!" })
    @IsEmail({}, { message: "Email is wrong format!!!" })
    email: string;

    @IsNotEmpty({ message: "Password not empty!!!" })
    password: string;

    phone: string;
    address: string;
    image: string;
}
