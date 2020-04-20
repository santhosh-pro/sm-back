import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {Row} from "../entities/Row";
import {RowService} from "./row.service";

@Controller('api/rows')
export class RowController {
    constructor(
        @InjectRepository(Row)
        private readonly repo: Repository<Row>,
        private readonly rowService: RowService
    ) {}

    @Get()
    public async all(
        @Query('page') page = 0,
        @Query('limit') limit = 20,
        @Query('templateid')templateId = 0
    ):Promise<Row[]>{
        limit = limit > 100 ? 100 : limit;
        let search:any = {};
        if (templateId) {
            search = {
                where: {template:{id: templateId}},
            };
        }
        const options: IPaginationOptions = {
            limit,
            page
        };
        let relations = ['template','cells','cells.template','cells.link','cells.column','cells.link.cells'];
        let query = await this.repo.find({relations,where: {template:{id: templateId}}});
        return query;
        //return await paginate<Row>(this.repo, options, search);
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