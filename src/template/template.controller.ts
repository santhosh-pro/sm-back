import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {TemplateService} from "./template.service";
import {Template} from "../entities/Template";
import {Pagination} from "nestjs-typeorm-paginate";

@Controller('api/templates')
export class TemplateController {
    constructor(private readonly TService: TemplateService) {}

    @Get()
    public async all(@Query('page') page = 0, @Query('limit') limit = 10)
        :Promise<Pagination<Template>>{

        limit = limit > 100 ? 100 : limit;
        return  await this.TService.all({page,limit,route: 'http://api/templates'});
    }

    @Get(":id")
    public async one(@Param("id")id:number):Promise<any>{
        return  await this.TService.one(id);
    }

    @Post()
    public async create(@Body() template: Template): Promise<Template>{
        console.log(template)
        return await this.TService.create(template);
    }

    @Put()
    public async update(@Body() template: Template):Promise<void> {
        await this.TService.update(template)
    }

    @Delete("/:id")
    public async delete(@Param("id") id: number):Promise<void> {
        return await this.TService.delete(id);
    }
}
