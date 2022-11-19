import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from 'src/authentication.entity';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcryptjs'
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthenticationService {
    constructor(@InjectRepository(Authentication) private authenticationRepository: Repository<Authentication>, private jwtService: JwtService) { }

    async create(body: CreateUserDto) {
        //Find a user with his email
        const existingUser = await this.authenticationRepository.find({ where: { email: body.email } })

        //If user exists, return an error that the email is already used
        if (existingUser.length) {
            throw new BadRequestException("Email Already Used")
        }
        //generate salt,hash the password then create the new user 
        const salt = await genSalt(12)
        const hashedPassword = await hash(body.password, salt)
        const newUser = this.authenticationRepository.create({ email: body.email, password: hashedPassword, userType: body.userType.toString() })
        return await this.authenticationRepository.save(newUser)
    }

    async login({ email, password }) {

        //If user exists, return an error that the email is already used
        const user = await this.authenticationRepository.findOne({ where: { email } })

        if (!user) {
            throw new BadRequestException("Incorrect Email or Password")
        }

        //compare the user password with the entered password
        const isValidPassword = await compare(password, user.password)

        if (!isValidPassword) {
            throw new BadRequestException("Incorrect Email or Password")
        }

        const payload = { ...user }
        const jwtPayload = this.jwtService.sign(payload)


        return { token: jwtPayload }


    }

    async findOne(id: any) {
        const user = this.authenticationRepository.findOne(id)

        if (!user) {
            throw new NotFoundException("User Not Found")
        }
        else {
            return user
        }

    }
}
