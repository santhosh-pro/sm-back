import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import { Tree } from "../entities/Tree"

@Controller('api/tree')
export class TreeController {
    constructor(
        @InjectRepository(Tree)
        private readonly repo: Repository<Tree>,
    ) {}

    @Get()
    public async all():Promise<Tree[]>{
        return await this.repo.find();
    }
    @Get("/tree/:id")
    public async one(@Param("id")id:number):Promise<any>{
        return  await this.repo.find({id});
    }

    @Post()
    public async create(@Body() tree: Tree): Promise<Tree>{
        return await this.repo.save(tree);
    }

    @Put()
    public async update(@Body() tree: Tree):Promise<Tree> {
        await this.repo.update(tree.id,tree);
        return tree

    }

    @Delete("/:id")
    public async delete(@Param("id") id: number):Promise<void> {
        await this.repo.delete(id);
    }
}