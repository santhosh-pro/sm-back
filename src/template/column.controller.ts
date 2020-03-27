import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Col} from "../entities/Col";

@Controller('api/columns')
export class ColumnController {
    constructor(
        @InjectRepository(Col)
        private readonly repo: Repository<Col>,
    ) {}

    @Get()
    public async all():Promise<Col[]>{
        return await this.repo.find();
    }
    @Get("/columns/:id")
    public async one(@Param("id")id:number):Promise<any>{
        return  await this.repo.find({id});
    }

    @Post()
    public async create(@Body() column: Col): Promise<Col>{
        return await this.repo.save(column);
    }

    @Put()
    public async update(@Body() column: Col):Promise<Col> {
        await this.repo.update(column.id,column);
        return column

    }

    @Delete("/:id")
    public async delete(@Param("id") id: number):Promise<void> {
        await this.repo.delete(id);
    }
}