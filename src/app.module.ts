import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ControllersModule } from "./controllers/controllers.module";

/*MongooseModule.forRoot('mongodb://localhost:27017/prueba_numero_uno')*/

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Prueba'),
    ControllersModule]
})
export class AppModule {}
