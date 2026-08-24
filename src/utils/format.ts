export function formatTanggal(tanggal: Date): string {
    return tanggal.toLocaleString("id-ID");
}

export function formatNama(nama: string) {
    return nama.slice(0, 1).toUpperCase() + nama.slice(1);
}