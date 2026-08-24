import {BaseModel} from "@models/BaseModel";

export class Peserta extends BaseModel {
    constructor(
        id: number,
        createdAt: string,
        public nama: string,
        public sekolah: string,
        public fase: number,
        public email: string,
        public kelas: string
    ) {
        super(id, createdAt);
    }
}