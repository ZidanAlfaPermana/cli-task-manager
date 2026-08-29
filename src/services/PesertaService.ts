import { PesertaRepository } from "@repositories";
import {Peserta} from "@apptypes";

export class PesertaService {
    private pesertaRepo: PesertaRepository;

    constructor(repository: PesertaRepository) {
        this.pesertaRepo = repository;
    }
    createPeserta(nama: string, sekolah: string, fase: number, kelas: string, email: string): Peserta {
        if (nama.trim() === "") {
            throw new Error("Gagal: Nama tidak boleh kosong!");
        }

        if (fase < 1 || fase > 3) {
            throw new Error("Gagal: Fase harus angka 1, 2, atau 3!");
        }
        const pesertaDiSekolah = this.pesertaRepo.findBySekolah(sekolah);

        const isDuplikat = pesertaDiSekolah.find(
            (p) => p.nama.toLowerCase() === nama.toLowerCase()
        );

        if (isDuplikat) {
            throw new Error(`Gagal: Peserta bernama ${nama} dari sekolah ${sekolah} sudah terdaftar!`);
        }

        const pesertaBaru = this.pesertaRepo.create({
            nama: nama,
            kelas: kelas,
            sekolah: sekolah,
            fase: fase,
            email: email,
        });

        return pesertaBaru;
    }
}