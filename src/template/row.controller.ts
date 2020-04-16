import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {Row} from "../entities/Row";
import {Cell} from "../entities/Cell";

@Controller('api/rows')
export class RowController {
    constructor(
        @InjectRepository(Row)
        private readonly repo: Repository<Row>,
        @InjectRepository(Row)
        private readonly rows: Repository<Row[]>,
        @InjectRepository(Cell)
        private readonly cells: Repository<Cell[]>,
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
    public async update(@Body() row: Row | Row[]):Promise<Row | Row[]> {
        if (Array.isArray(row)) {
            for (const r of row){
                const nRow = new Row();
                nRow.id = r.id;
                nRow.template = r.template;
                const savedRow = await this.repo.save(nRow);
                r.cells.forEach(cell => {
                    cell.row = savedRow
                });
                await this.cells.save(r.cells);
            }
            return await this.repo.find({where: {templateId: row[0].template.id}});
        }
        return await this.repo.save(row);

    }

    @Delete("/:id")
    public async delete(@Param("id") id: number):Promise<void> {
        await this.repo.delete(id);
    }
}