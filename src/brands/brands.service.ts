import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
@Injectable()
export class BrandsService {

  private brands: Brand[];
  create(createBrandDto: CreateBrandDto) : Brand{
    const {name} = createBrandDto;
    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime()
    }
    this.brands.push(brand);
    return brand;
  }

  findAll() : Brand[] {
    return this.brands;
  }

  findOne(id: string) : Brand{
    const brand = this.brands.find(brand => brand.id === id);
    if(!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) : Brand {
    let brandDB = this.findOne(id);
    this.brands = this.brands.map(brand => {
      if(brand.id === id){
        brandDB.updatedAt = new Date().getTime();
        brandDB = {...brandDB, ...updateBrandDto};
        return brandDB;
      }
      return brand;
    })
    return brandDB;
  }

  remove(id: string) {
    this.brands = this.brands.filter(brand=> brand.id !== id);
  }
  fillBrandsWithSeedData(brands: Brand[]){
        this.brands = brands;
    }
}
