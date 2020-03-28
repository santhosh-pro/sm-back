import { Injectable } from '@nestjs/common';
import {Template} from "../entities/Template";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(Template)
        private readonly TRepo: Repository<Template>,
    ) {}

    async all(options: IPaginationOptions):Promise<Pagination<Template>> {
        return await paginate<Template>(this.TRepo, options);
    }

    async create(template: Template):Promise<Template>{
        return await this.TRepo.save(template);
    }

    async update(template: Template):Promise<Template> {
        await this.TRepo.update(template.id,template);
        return template;
    }

    async delete(id: number):Promise<void> {
        await this.TRepo.delete(id)
    }

    async one(id: number) {
        return await this.TRepo.findOne(id)
    }
}
