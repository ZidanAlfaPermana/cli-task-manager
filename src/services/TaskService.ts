// Method yang harus ada:
// - tambahTask(judul: string, prioritas?: Priority): Task
// - getSemuaTask(): Task[]
// - getTaskByStatus(status: TaskStatus): Task[]
// - ubahStatus(id: number, status: TaskStatus): Task | undefined
// - hapusTask(id: number): boolean
// - cariTask(keyword: string): Task[]
// - getStats(): TaskStats

import { TaskRepository } from "repositories";
import {TaskStats, Task, Priority, TaskStatus} from "./../types";
import {isJudulValid, isPriorityValid} from "utils";

export class TaskService {
    private taskRepo: TaskRepository;

    constructor(repository: TaskRepository) {
        this.taskRepo = repository;
    }

    tambahTask(judul: string,  prioritas?: Priority): Task {
        const currentTimestamp = new Date().toISOString();

        if (!isJudulValid(judul)) {
            throw new Error("Gagal: judul tidak boleh kosong!");
        }

        if (prioritas === undefined) {
            throw new Error("Gagal: prioritas tidak boleh kosong!");
        }

        if (!isPriorityValid(prioritas)) {
            throw new Error("Gagal: prioritas harus terdiri dari low, medium, high atau urgent!");
        }
        const taskBaru = this.taskRepo.create({
            judul: judul,
            prioritas: prioritas,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
            status: "in_progress"
        });

        return taskBaru;

    }

    getSemuaTask(): Task[] {
        return this.taskRepo.findAll();
    }

    getTaskByStatus(status: TaskStatus): Task[] {
        return this.taskRepo.findByStatus(status);
    }

    ubahStatus(id: number, status: TaskStatus): Task | undefined {
        return this.taskRepo.update(id, {status: status});
    }

    hapusTask(id: number): boolean {
        return this.taskRepo.delete(id);
    }

    cariTask(keyword: string): Task[] {
        return this.taskRepo.search(keyword);
    }

    getStats(): TaskStats {
        const semua = this.taskRepo.findAll();
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