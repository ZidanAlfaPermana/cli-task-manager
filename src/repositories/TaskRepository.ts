// Gunakan generic Repository dari Minggu 5, lalu extend:
// - findByStatus(status: TaskStatus): Task[]
// - findByPrioritas(prioritas: Priority): Task[]
// - search(keyword: string): Task[]
// - muatDariArray(tasks: Task[]): void   ← untuk load dari JSON nanti
import {Priority, Task, TaskStatus} from "types";
import {Repository} from "repositories/Repository";

export class TaskRepository extends Repository<Task> {
    findByStatus(status: TaskStatus): Task[] {
        return this.findAll().filter((item) => item.status === status);
    }

    findByPrioritas(prioritas: Priority): Task[] {
        return this.findAll().filter((item) => item.prioritas === prioritas);
    }

    search(keyword: string): Task[] {
        return this.findAll().filter((item) => item.judul === keyword)
    }

    muatDariArray(tasks: Task[]): void {
        this.items = [...tasks];
    }
}