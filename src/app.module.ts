import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from './authentication.entity';
import { AuthenticationModule } from './authentication/authentication.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: '22995621',
      port: 5432,
      database: 'elearning',
      entities:[Authentication],
      synchronize: true, // Will be changed to false in production
    }),
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
