import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
    
    constructor(private readonly carsService: CarsService)
    {
        
    }
    @Get()
    getAllCars(){
        console.log(this.carsService.findAll());
        return this.carsService.findAll();
    }
    @Get(":id")
    getCarById(@Param('id', ParseIntPipe) id: number){
        console.log({id});
        return this.carsService.findById(Number(id));
        
    }
    @Post()
    createCar(@Body() body: any){
        return body;
    }
    @Patch()
    updateCar(){
        
    }
}
