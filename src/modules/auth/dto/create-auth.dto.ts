import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateAuthDto {
    @IsNotEmpty({ message: "Email not empty!!!" })
    @IsEmail()
    email: string

    @IsNotEmpty({ message: "Password not empty!!!" })
    password: string

    @IsNotEmpty({ message: "Name not empty!!!" })
    name: string
}
