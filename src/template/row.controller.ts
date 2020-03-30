import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {Row} from "../entities/Row";

@Controller('api/rows')
export class RowController {
    constructor(
        @InjectRepository(Row)
        private readonly repo: Repository<Row>,
    ) {}

    @Get()
    public async all(
        @Query('page') page = 0,
        @Query('limit') limit = 10,
        @Query('templateid')templateId = 0
    ):Promise<Pagination<Row>>{
        limit = limit > 100 ? 100 : limit;
        const search:any = {};
        if (templateId) search.templateId = templateId;
        const options: IPaginationOptions = {
            limit,
            page
        };

        return await paginate<Row>(this.repo, options, search);
    }

    @Get(":id")
    public async one(@Param("id")id:number):Promise<any>{
        return  await this.repo.find({id});
    }

    @Post()
    public async create(@Body() column: Row): Promise<Row>{
        return await this.repo.save(column);
    }

    @Put()
    public async update(@Body() row: Row):Promise<Row> {
        return await this.repo.save(row);

    }

    @Delete("/:id")
    public async delete(@Param("id") id: number):Promise<void> {
        await this.repo.delete(id);
    }
}