export interface Peserta extends Entity {
    nama: string;
    sekolah: string;
    kelas: string;
    email: string;
    fase: number;
}

export interface JurnalHarian extends Entity {
    kegiatan: string;
    hambatan: string;
    rencanaBesok: string;
    linkCommit?: string;
}

export interface Entity {
    id: number;
}