import type { Task, TaskStatus, Priority } from "@apptypes/task.types";

export default class TaskModel implements Task {
    readonly id: number;
    judul: string;
    status: TaskStatus;
    prioritas: Priority;
    deadline?: string;
    readonly createdAt: string;
    updatedAt: string;
    completedAt?: string;

    constructor(id: number, judul: string, prioritas: Priority = "medium") {
        this.id = id;
        this.judul = judul;
        this.status = "todo";
        this.prioritas = prioritas;
        this.createdAt = new Date().toISOString();
        this.updatedAt = this.createdAt;
    }

    // Getter untuk computed value — dari Minggu 4
    get isOverdue(): boolean {
        if (!this.deadline || this.status === "done") return false;
        return new Date(this.deadline) < new Date();
    }

    get umurHari(): number {
        const selisih = Date.now() - new Date(this.createdAt).getTime();
        return Math.floor(selisih / (1000 * 60 * 60 * 24));
    }
}