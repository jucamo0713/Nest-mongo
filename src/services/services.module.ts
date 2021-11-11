import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { SchemasModule } from '../schemas/schemas.module';
import { TasksService } from './tasks/tasks.service';
import { HashingService } from './security/hashing/hashing.service';
import { EncryptingService } from './security/encrypting/encrypting.service';
import { AuthService } from './security/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './security/auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './security/auth/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), SchemasModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_PASSWORD,
    signOptions: { expiresIn: '2 Days' },

  })],
  providers: [HashingService, EncryptingService, AuthService, UserService, TasksService, LocalStrategy, JwtStrategy],
  exports: [HashingService, EncryptingService, AuthService, UserService, TasksService, LocalStrategy, JwtStrategy],
})

export class ServicesModule {
}