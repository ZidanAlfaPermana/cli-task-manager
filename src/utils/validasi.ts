import {Priority, TaskStatus} from "./../types";

function isEmailValid(email: string) {
    return /^[a-zA-Z0._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email);
}

function isNilaiValid(nilai: number) {
    return nilai >= 0 || nilai <= 100;
}

function isNamaValid(nama: string) {
    return /^[a-zA-Z\s'-]{2,50}$/.test(nama);
}

// - isJudulValid(judul: string): boolean       → minimal 3 karakter
// - isIdValid(id: unknown): id is number       → type guard!
// - isPriorityValid(p: string): p is Priority
// - isStatusValid(s: string): s is TaskStatus
function isJudulValid(judul: string): boolean {
    return judul.length < 3;
}

function isIdValid(id: unknown): id is number {
    return typeof id === 'number';
}

function isPriorityValid(p: string): p is Priority {
    return p === 'low' || p === 'medium' || p === 'high'
}

function isStatusValid(s: string): s is TaskStatus {
    return s === 'todo' || s === 'in_progress' || s === 'done';
}

export { isEmailValid, isNilaiValid, isNamaValid, isJudulValid, isIdValid, isPriorityValid, isStatusValid };