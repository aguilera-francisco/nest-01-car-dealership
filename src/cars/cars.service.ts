import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { ICar } from './interfaces/car.interface';
@Injectable()
export class CarsService {
    private cars: ICar[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ]
    findAll(){
        return this.cars;
    }
    findById(id: string){
        const car = this.cars.find( car => car.id === id );
        if ( !car ) throw new NotFoundException(`Car with id '${ id }' not found`);
        
        return car;
    }
    create(createCarDto: CreateCarDto): ICar{
        const newCar: ICar = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(newCar);
        return newCar;
    }
    update(id: string, updateCarDto: UpdateCarDto): ICar{
        let carToUpdate = this.findById(id);
        if(!carToUpdate){
            throw new NotFoundException(`Car with id '${ id }' not found to patch`);
        }
        this.cars = this.cars.map(car => {
            if(car.id === id){
                carToUpdate = {
                    ...carToUpdate,
                    ...updateCarDto
                }
                return carToUpdate;
            }
            return car;
        })
        return carToUpdate;
    }
    delete(id: string): ICar{
        const carToDelete = this.findById(id);
        const index = this.cars.indexOf(carToDelete);
        this.cars.splice(index, 1);
        return carToDelete;
    }
}
