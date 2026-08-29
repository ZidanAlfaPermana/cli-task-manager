// Method yang harus ada:
// - tambahTask(judul: string, prioritas?: Priority): Task
// - getSemuaTask(): Task[]
// - getTaskByStatus(status: TaskStatus): Task[]
// - ubahStatus(id: number, status: TaskStatus): Task | undefined
// - hapusTask(id: number): boolean
// - cariTask(keyword: string): Task[]
// - getStats(): TaskStats

import {TaskRepository} from "@repositories";
import {TaskStats, Task, Priority, TaskStatus} from "@apptypes";
import {isDateValid, isJudulValid, isNamaFileValid, isPriorityValid} from "@utils";
import {StorageService} from "@services";

export class TaskService {
    private repo: TaskRepository;

    constructor(repo: Task[]) {
        this.repo = new TaskRepository();
        this.repo.muatDariArray(repo);
    }

    tambahTask(judul: string, prioritas?: Priority, deadline?: string): Task {
        const currentTimestamp = new Date().toISOString();
        if (!isJudulValid(judul)) {
            throw new Error("Gagal: judul tidak boleh kosong!");
        }
        let finalPriority: Priority = "medium";
        if (prioritas !== undefined) {
            if (!isPriorityValid(prioritas)) {
                throw new Error("Gagal: prioritas harus terdiri dari low, medium, high atau urgent!");
            }
            finalPriority = prioritas;
        }
        if (deadline !== undefined) {
            if (!isDateValid(deadline)) {
                throw new Error("Gagal: tanggal deadline tidak valid, harus berupa DD-MM-YYYY!");
            }
        }
        const taskBaru = this.repo.create({
            judul: judul,
            prioritas: finalPriority,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
            status: "todo",
            deadline: deadline
        });

        return taskBaru;
    }

    getSemuaTask(): Task[] {
        return this.repo.findAll();
    }

    exportToTxT(fileName: string): boolean {
        if (!isNamaFileValid(fileName)) return false;
        return StorageService.exportToTxt(fileName)
    }

    getFilteredTasks(status?: TaskStatus, prioritas?: Priority, sortBy?: "deadline"): Task[] {
        let tasks = this.repo.findAll();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (prioritas) {
            tasks = tasks.filter(task => task.prioritas === prioritas);
        }
        if (sortBy === "deadline") {
            tasks = tasks.filter(task => task.deadline !== undefined);
            tasks = tasks.sort((a, b) => {
                const parseDate = (dateStr: string) => {
                    const [day, month, year] = dateStr.split('-');
                    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
                };
                const dateA = parseDate(a.deadline!);
                const dateB = parseDate(b.deadline!);
                return dateA - dateB;
            });
        }
        return tasks;
    }

    ubahDeadline(id: number, deadline: string): Task | undefined {
        return this.repo.update(id, {deadline: deadline});
    }

    ubahPrioritas(id: number, prioritas: Priority): Task | undefined {
        return this.repo.update(id, {prioritas: prioritas});
    }

    ubahStatus(id: number, status: TaskStatus): Task | undefined {
        return this.repo.update(id, {status: status});
    }

    ubahJudul(id: number, judul: string): Task | undefined {
        if (!isJudulValid(judul)) {
            throw new Error("Gagal: judul tidak boleh kosong!");
        }
        return this.repo.update(id, {judul: judul});
    }

    hapusTask(id: number): boolean {
        return this.repo.delete(id);
    }

    cariTask(keyword: string): Task[] {
        return this.repo.search(keyword);
    }

    getStats(): TaskStats {
        const semua = this.repo.findAll();
        const done = semua.filter(t => t.status === "done").length;

        return {
            total: semua.length,
            todo: semua.filter(t => t.status === "todo").length,
            inProgress: semua.filter(t => t.status === "in_progress").length,
            done,
            persentaseSelesai: semua.length === 0 ? 0 : Math.round((done / semua.length) * 100)
        };
    }
}