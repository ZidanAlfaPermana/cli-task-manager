export type TaskStatus = "todo" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high" | "urgent";

export interface Task {
    readonly id: number;
    judul: string;
    status: TaskStatus;
    prioritas: Priority;
    deadline?: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
}

// Utility types dari Minggu 6
export type TaskBaru = Omit<Task, "id" | "createdAt" | "updatedAt" | "completedAt">;
export type TaskUpdate = Partial<Omit<Task, "id" | "createdAt">>;

export interface TaskStats {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
    persentaseSelesai: number;
}