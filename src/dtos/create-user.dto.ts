import { IsString, IsEmail, Length, IsEnum } from "class-validator";


export enum USERTYPE {
    ADMIN,
    STUDENT,
    LECTURER,
    CUSTOMERSUPPORT,
}


export class CreateUserDto {

    @IsEmail()
    @IsString()
    email: string

    @Length(6,50, { message: "Password Must not be less than 6 characters" })
    @IsString()
    password: string

    @IsEnum(USERTYPE)
    @IsString()
    userType: USERTYPE

}