import { Injectable } from '@nestjs/common';

import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService
  ) { }


  async runSeed() {
    await this.insertNewProducts();
    return 'SEED EXECUTED';
  }

  private async insertNewProducts() {
    this.productsService.deleteAllProducts();
    const products = initialData.products;
    const insertPromises = [];

    products.forEach( product => {
      insertPromises.push( this.productsService.create( product ) );
    } );

    const results = await Promise.all( insertPromises );
  }
}
