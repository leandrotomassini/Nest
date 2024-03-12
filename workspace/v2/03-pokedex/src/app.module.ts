import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfigutarion } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module( {
  imports: [

    ConfigModule.forRoot( {
      load: [ EnvConfigutarion ],
      validationSchema: JoiValidationSchema
    } ),

    ServeStaticModule.forRoot( {
      rootPath: join( __dirname, '..', 'public' ),
    } ),

    MongooseModule.forRoot( process.env.MONGODB),

    PokemonModule,

    CommonModule,

    SeedModule,

  ],
} )
export class AppModule { }
