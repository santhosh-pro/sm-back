import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Dictionary} from "../entities/Dictionary";

@Controller('api/dictionaries')
export class DictionaryController {
    constructor(
        @InjectRepository(Dictionary)
        private readonly repo: Repository<Dictionary>,
    ) {}

    @Get()
    public async all():Promise<Dictionary[]>{
        return await this.repo.find();
    }
    @Get(":id")
    public async one(@Param("id")id:number):Promise<any>{
        return  await this.repo.find({id});
    }

    @Post()
    public async create(@Body() req: Dictionary): Promise<Dictionary>{
        return await this.repo.save(req);
    }

    @Put()
    public async update(@Body() req: Dictionary):Promise<Dictionary> {
        await this.repo.update(req.id,req);
        return req

    }

    @Delete("/:id")
    public async delete(@Param("id") id: number):Promise<void> {
        await this.repo.delete(id);
    }
}