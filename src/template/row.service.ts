import {Injectable} from "@nestjs/common";
import {Connection, Repository} from "typeorm";
import {Row} from "../entities/Row";
import {Cell} from "../entities/Cell";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class RowService {

    constructor(
        @InjectRepository(Row)
        private readonly rowRepository: Repository<Row>,
        @InjectRepository(Cell)
        private readonly cellRepository: Repository<Cell>
    ) {}

    async saveMany(row: Row[]) {
        let rows: Row[] = [];
        let cells: Cell[] = [];
        for (const r of row){
            const nRow = new Row();
            nRow.id = r.id;
            nRow.template = r.template;
            nRow.cells = JSON.parse(JSON.stringify(r.cells));
            r.cells = [];
            rows.push(nRow);
        }
        let savedRows = await this.rowRepository.save(row);

        for (let i = 0; i < savedRows.length; i++) {
            let oldRow = rows[i];
            let lightRow = new Row();
            lightRow.id = savedRows[i].id;
            oldRow.cells.forEach(cell => {
                cell.row = lightRow;
                cells.push(cell);
            })
        }
        await this.cellRepository.save(cells);
    }
}