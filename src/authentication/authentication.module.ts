import { Module } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { AuthenticationController } from './authentication.controller'
import { Authentication } from 'src/authentication.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: '7d'
    }
  }),
  inject: [ConfigService],
  imports: [ConfigModule]
}
@Module({
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthenticationController],
  imports: [
    TypeOrmModule.forFeature([Authentication]),
    JwtModule.registerAsync(jwtFactory),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ]
})
export class AuthenticationModule {}
