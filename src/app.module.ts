import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.URI_MONGODB), ControllersModule],
})
export class AppModule {}
