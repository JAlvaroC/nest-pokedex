
import { join } from 'path';//Node

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';


// @Module({
//   imports: [],
//   // controllers: [AppController],
//   // providers: [AppService],
// })
@Module({
  imports: [
  ServeStaticModule.forRoot({
  rootPath: join(__dirname,'..','public'),
  }),

  MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
  PokemonModule,
  CommonModule,
  
  ],
  })
  export class AppModule {}
// export class AppModule {}
