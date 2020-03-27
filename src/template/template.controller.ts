import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TemplateService} from "./template.service";
import {Template} from "../entities/Template";

@Controller('api/templates')
export class TemplateController {
    constructor(private readonly TService: TemplateService) {}

    @Get()
    public async all():Promise<Template[]>{
        const res = await this.TService.all();
        console.dir(res);
        return res;
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
    public async update(@Body() template: Template):Promise<Template> {
        return await this.TService.update(template)
    }

    @Delete("/:id")
    public async delete(@Param("id") id: number):Promise<void> {
        return await this.TService.delete(id);
    }
}
