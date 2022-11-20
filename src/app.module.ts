import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Authentication } from './authentication.entity'
import { AuthenticationModule } from './authentication/authentication.module'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '@nestjs/config/dist'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get('DB_NAME'),
        entities: [Authentication],
        synchronize: configService.get('DB_SYNCHRONIZE') // Will be changed to false in production
      }),
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
