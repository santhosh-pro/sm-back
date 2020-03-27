import { Module } from '@nestjs/common';
import {entities} from "../entities";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TemplateController} from "./template.controller";
import {TemplateService} from "./template.service";
import {ColumnController} from "./column.controller";
import {TreeController} from "./tree.controller";
import {DictionaryController} from "./dictionary.controller";

@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    controllers: [
        TemplateController,
        ColumnController,
        TreeController,
        DictionaryController
    ],
    providers: [TemplateService]
})
export class TemplateModule {}
