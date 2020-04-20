import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {Cell} from "../entities/Cell";
import {Row} from "../entities/Row";

@Controller('api/cells')
export class CellController {
    constructor(
        @InjectRepository(Cell)
        private readonly repo: Repository<Cell>,
        @InjectRepository(Row)
        private readonly rowRepo: Repository<Row>
    ) {}

    @Get()
    public async all(
        @Query('page') page = 0,
        @Query('limit') limit = 10
    ):Promise<Pagination<Cell>>{
        limit = limit > 100 ? 100 : limit;
        const options: IPaginationOptions = {
            limit,
            page
        };
        const query = this.repo
            .createQueryBuilder('cell');
            //.leftJoinAndSelect("col.template", "template");

        return await paginate<Cell>(query, options);
    }

    @Get(":id")
    public async one(@Param("id")id:number):Promise<any>{
        return  await this.repo.find({id});
    }

    @Post()
    public async create(@Body() cell: Cell): Promise<Cell>{
        if (!cell.row.id) {
            const row = new Row();
            row.template = cell.template;
            cell.row = await this.rowRepo.save(row);
        }
        return await this.repo.save(cell);
    }

    @Post("/create-link")
    public async createLink(@Body() cell: Cell): Promise<Cell>{
        let cellFromDb = await this.repo.findOne({id: cell.id});
        if (cellFromDb) {
            cellFromDb.link = cell.link;
            return await this.repo.save(cellFromDb);
        }
        return await this.repo.save(cell);
    }

    @Put()
    public async update(@Body() cell: Cell):Promise<Cell> {
        return await this.repo.save(cell);

    }

    @Delete("/:id")
    public async delete(@Param("id") id: number):Promise<void> {
        const cell = await this.repo.findByIds([id],{relations:['row']});
        await this.repo.delete(id);
        const row = await this.rowRepo.findOne({id: cell[0].row.id});
        if (!row.cells.length) await this.rowRepo.delete(row.id);
    }

    @Post('/template/:rowId')
    public async byTemplateId(
        @Query('page') page = 0,
        @Query('limit') limit = 20,
        @Param("rowId") id: number
    ):Promise<Pagination<any>> {
        const route = 'http://api/cells/row/' + id;
        const query = this.repo.createQueryBuilder('cell')
            .where({templateId: id})
            .groupBy('rowId')
            .printSql();
        return await paginate(
            query,
            {
                page,
                limit,
                route
            }
        )
    }
}