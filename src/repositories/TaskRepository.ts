// Gunakan generic Repository dari Minggu 5, lalu extend:
// - findByStatus(status: TaskStatus): Task[]
// - findByPrioritas(prioritas: Priority): Task[]
// - search(keyword: string): Task[]
// - muatDariArray(tasks: Task[]): void   ← untuk load dari JSON nanti
import {Priority, Task, TaskStatus} from "@apptypes";
import {Repository} from "./Repository";

export class TaskRepository extends Repository<Task> {
    findByStatus(status: TaskStatus): Task[] {
        return this.findAll().filter((item) => item.status === status);
    }

    findByPrioritas(prioritas: Priority): Task[] {
        return this.findAll().filter((item) => item.prioritas === prioritas);
    }

    filterByDeadline(): Task[] {
        return this.findAll().filter((item) => item.deadline !== undefined);
    }

    search(keyword: string): Task[] {
        return this.findAll().filter((item) => item.judul === keyword)
    }

    muatDariArray(tasks: Task[]): void {
        this.items = [...tasks];
        if (this.items.length > 0) {
            const maxId = Math.max(...this.items.map((item: any) => item.id));
            this.nextId = maxId + 1;
        }
    }
}