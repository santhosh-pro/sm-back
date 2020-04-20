import { Injectable } from '@nestjs/common';
import {Template} from "../entities/Template";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {Col} from "../entities/Col";

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(Template)
        private readonly TRepo: Repository<Template>,
        @InjectRepository(Col)
        private readonly CRepo: Repository<Col>,
    ) {}

    async all(options: IPaginationOptions):Promise<Pagination<Template>> {
        return await paginate<Template>(this.TRepo, options);
    }

    async create(template: Template):Promise<Template>{
        return await this.TRepo.save(template);
    }

    async update(template: Template):Promise<void> {
        console.log(template);
        await this.TRepo.save(template);
    }

    async delete(id: number):Promise<void> {
        await this.TRepo.delete(id)
    }

    async one(id: number) {
        let template = await this.TRepo.findOne(id,{relations: ['columns','columns.link']});
        let columns = await this.CRepo.find(
            {
                where:{
                    template:{id:template.id}
                },
                relations: ["link"]
            });
        template.columns.forEach((col,index)=>{
            template.columns[index] = columns.find(c=> c.id === col.id);
        });
        return template;
    }
}
