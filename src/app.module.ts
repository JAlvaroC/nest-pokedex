
import { join } from 'path';//Node

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


// NOTE , DEBEMOS TENER ENN CUENTA EL ORDEN EN LAS IMPORTACION :EJM EN ENV PARA NO TENNER NULL
@Module({
  imports: [
  ConfigModule.forRoot({
    load:[EnvConfiguration],
    validationSchema:JoiValidationSchema
  }),
  ServeStaticModule.forRoot({
  rootPath: join(__dirname,'..','public'),
  }),
  MongooseModule.forRoot(process.env.MONGODB),
  PokemonModule,
  CommonModule,
  SeedModule,
  
  ],
  })
  export class AppModule {
    // constructor(){
    //   console.log(process.env);
    // }
  }
// export class AppModule {}
