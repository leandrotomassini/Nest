import { Module } from '@nestjs/common';

import { ProductsModule } from 'src/products/products.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module( {
  controllers: [
    SeedController
  ],
  imports: [
    ProductsModule
  ],
  providers: [
    SeedService
  ],
} )
export class SeedModule { }
