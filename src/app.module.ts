import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ControllersModule } from './controllers/controllers.module';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './services/security/auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import passport from 'passport';

/*MongooseModule.forRoot('mongodb://localhost:27017/prueba_numero_uno')*/

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Prueba'),
    ControllersModule],
})
export class AppModule {
}
