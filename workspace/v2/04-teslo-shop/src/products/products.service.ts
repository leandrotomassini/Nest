import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductImage, Product } from './entities';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger( 'ProductsService' );

  constructor(
    @InjectRepository( Product )
    private readonly productRepository: Repository<Product>,

    @InjectRepository( ProductImage )
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource
  ) { }

  async create( createProductDto: CreateProductDto ) {
    try {

      const { images = [], ...productDetails } = createProductDto;

      const product = this.productRepository.create( {
        ...productDetails,
        images: images.map( image => this.productImageRepository.create( { url: image } ) )
      } );
      await this.productRepository.save( product );
      return { ...product, images };
    } catch ( error ) {
      this.handleDbException( error );
    }
  }


  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productRepository.find( {
      take: limit,
      skip: offset,
      relations: {
        images: true
      }
    } );

    return products.map( product => ( {
      ...product,
      images: product.images.map( img => img.url )
    } ) );
  }

  async findOne( term: string ) {

    let product: Product;

    if ( isUUID( term ) ) {
      product = await this.productRepository.findOneBy( { id: term } );
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder( 'prod' );

      product = await queryBuilder
        .where( 'UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLocaleLowerCase()
        } )
        .leftJoinAndSelect( 'prod.images', 'prodImages' )
        .getOne();
    }

    if ( !product ) {
      throw new NotFoundException( `Product with term '${ term }' not found.` );
    }

    return product;
  }

  async findOnePlain( term: string ) {
    const { images = [], ...rest } = await this.findOne( term );
    return {
      ...rest,
      images: images.map( image => image.url )
    };
  }

  async update( id: string, updateProductDto: UpdateProductDto ) {

    const { images, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload( {
      id,
      ...toUpdate
    } );

    if ( !product ) throw new NotFoundException( `Product with id: '${ id }' not found.` );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if ( images ) {

        await queryRunner.manager.delete( ProductImage, { product: { id } } );

        product.images = images.map(
          image => this.productImageRepository.create( { url: image } )
        );
      }

      await queryRunner.manager.save( product );
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );
    } catch ( error ) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDbException( error );
    }
  }

  async remove( id: string ) {
    const product = await this.findOne( id );
    await this.productRepository.remove( product );
  }

  private handleDbException( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException( error.detail );
    this.logger.error( error );
    throw new InternalServerErrorException( `Unexpected error, check server logs.` );
  }


  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder( 'product' );
    
    try {
      return await query
        .delete()
        .where( {} )
        .execute();
    } catch ( error ) {
      this.handleDbException( error );
    }
  }
}
