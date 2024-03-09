import { Controller, Get, Post, Param, ParseIntPipe, Body, Patch, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-card.dto';
import { UpdateCarDto } from './dto/update-card.dto';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService,
    ) { }

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.findOneById(id);
    }

    @Post()
    createCar(@Body() createCarDto: CreateCarDto) {
        this.carsService.create(createCarDto);
        return createCarDto;
    }


    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateCarDto: UpdateCarDto
    ) {
        return this.carsService.update(id, UpdateCarDto);
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete(id);
    }
}

