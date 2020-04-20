import { Module } from '@nestjs/common';
import {entities} from "../entities";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TemplateController} from "./template.controller";
import {TemplateService} from "./template.service";
import {ColumnController} from "./column.controller";
import {TreeController} from "./tree.controller";
import {CellController} from "./cell.controller";
import {RowController} from "./row.controller";
import {RowService} from "./row.service";

@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    controllers: [
        TemplateController,
        ColumnController,
        TreeController,
        CellController,
        RowController
    ],
    providers: [TemplateService,RowService]
})
export class TemplateModule {}
