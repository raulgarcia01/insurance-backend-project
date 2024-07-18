import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RestModule } from './rest/rest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './rest/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { UsersService } from './rest/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { connectionOptions } from './config/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({ ...connectionOptions, autoLoadEntities: true }),
    AuthModule,
    RestModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, JwtService],
})
export class AppModule {}
