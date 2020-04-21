import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Row} from "../entities/Row";
import {RowService} from "./row.service";

@Controller('api/rows')
export class RowController {
    relations: string[];
    constructor(
        @InjectRepository(Row)
        private readonly repo: Repository<Row>,
        private readonly rowService: RowService
    ) {
        this.relations = [
            'template',
            'cells',
            'cells.template',
            'cells.link',
            'cells.column',
            'cells.link.cells'
        ];
    }

    @Get()
    public async all(
        @Query('page') page = 0,
        @Query('limit') limit = 20,
        @Query('templateid')templateId = 0
    ):Promise<Row[]>{
        return  await this.repo.find({
            relations: this.relations,
            where: {
                template:{
                    id: templateId
                }
            }
        });
    }

    @Get(":id")
    public async one(@Param("id")id:number):Promise<any>{
        return  await this.repo.findOne(id,{
            relations: this.relations
        });
    }

    @Post()
    public async create(@Body() column: Row): Promise<Row>{
        return await this.repo.save(column);
    }

    @Put()
    public async update(@Body() row: Row | Row[]):Promise<Row | void> {
        if (Array.isArray(row)) {
            try {
                await this.rowService.saveMany(row);
            }catch (e) {
                console.log(e)
            }

            return;
        }
        return await this.repo.save(row);

    }

    @Delete("/:id")
    public async delete(@Param("id") id: number):Promise<void> {
        await this.repo.delete(id);
    }
}