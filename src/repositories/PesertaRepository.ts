import {Peserta} from "@apptypes/";
import {Repository} from "@repositories/Repository";

export class PesertaRepository extends Repository<Peserta> {
    findBySekolah(sekolah: string): Peserta[] {
        return this.findAll().filter((item) => item.sekolah === sekolah);
    }

    findByFase(fase: number): Peserta[] {
        return this.findAll().filter((item) => item.fase === fase);
    }
}