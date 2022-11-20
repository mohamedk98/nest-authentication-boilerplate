import { IsString, IsEmail, Length, IsEnum } from 'class-validator'
import { UserTypes } from 'src/utils/user-types'

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string

  @Length(6, 50, { message: 'Password Must not be less than 6 characters' })
  @IsString()
  password: string

  @IsEnum(UserTypes)
  @IsString()
  userType: UserTypes
}
