import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateCarDto } from './DTO/create-car.dto';
import { UpdateCarDto } from './DTO/update-car.dto';
import { CarsService } from './cars.service';
import { ICar } from './interfaces/car.interface';

@Controller('cars')
export class CarsController {
    
    constructor(private readonly carsService: CarsService)
    {
        
    }
    @Get()
    getAllCars(){
        return this.carsService.findAll();
    }
    @Get(":id")
    getCarById(@Param('id', ParseUUIDPipe) id: string){
        return this.carsService.findById(id);
        
    }
    @Post()
    createCar(@Body() createCarDto: CreateCarDto): ICar{
        return this.carsService.create(createCarDto);
    }
    @Patch(":id")
    updateCar(@Param('id', ParseUUIDPipe)id: string, @Body() updateCarDto: UpdateCarDto): ICar{
        return this.carsService.update(id, updateCarDto); 
    }
    @Delete(":id")
    deleteCar(@Param('id', ParseUUIDPipe) id: string): ICar{
        return this.carsService.delete(id);
    }
}
