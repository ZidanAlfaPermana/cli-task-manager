import {BaseModel} from "./BaseModel";

export class JurnalHarian extends BaseModel {
    constructor(
        id: number,
        createdAt: string,
        public kegiatan: string,
        public linkCommit: string|null|undefined,
    ) {
        super(id, createdAt);
    }
}