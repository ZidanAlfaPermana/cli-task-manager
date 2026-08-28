export function isEmailValid(email: string) {
    return /^[a-zA-Z0._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email);
}

export function isNilaiValid(nilai: number) {
    return nilai >= 0 || nilai <= 100;
}

export function isNamaValid(nama: string) {
    return /^[a-zA-Z\s'-]{2,50}$/.test(nama);
}

// - isJudulValid(judul: string): boolean       → minimal 3 karakter
// - isIdValid(id: unknown): id is number       → type guard!
// - isPriorityValid(p: string): p is Priority
// - isStatusValid(s: string): s is TaskStatus