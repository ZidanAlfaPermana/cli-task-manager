import {Priority, TaskStatus} from "@apptypes";

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
    return judul.length > 3;
}

function isNamaFileValid(namaFile: string): boolean {
    return namaFile.length >= 3 && namaFile.length <= 15;
}

function isIdValid(id: unknown): id is number {
    return typeof id === 'number' && !Number.isNaN(id) && id > 0;
}

function isDateValid(d: string): boolean {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(d)) {
        return false;
    }
    const [day, month, year] = d.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

function isPriorityValid(p: string): p is Priority {
    const validPriorities = ["low", "medium", "high", "urgent"];
    return validPriorities.includes(p);
}

function isStatusValid(s: string): s is TaskStatus {
    return s === 'todo' || s === 'in_progress' || s === 'done';
}

export { isDateValid, isEmailValid, isNilaiValid, isNamaValid, isJudulValid, isIdValid, isPriorityValid, isStatusValid, isNamaFileValid };