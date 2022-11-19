import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { Authentication } from 'src/authentication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthenticationService,JwtStrategy],
  controllers: [AuthenticationController],
  imports: [TypeOrmModule.forFeature([Authentication]), JwtModule.register({
    secret: "#2b$100c$fgG29wf1IbGlI7hOHkhaJO43ZUTlohNH9tXHNJKJJ1zg899FN3sK",
    signOptions: {
      expiresIn: "7d"
    }
  }), PassportModule.register({ defaultStrategy: "jwt" })],

})
export class AuthenticationModule { }
