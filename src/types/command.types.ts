import type { TaskStatus, Priority } from "./task.types";

// Discriminated union dari Minggu 2
export type Command =
    | { type: "add"; judul: string; deadline?: string; prioritas?: Priority; }
    | { type: "list"; filterStatus?: TaskStatus; filterPriority?: Priority; sortBy?: "deadline" }
    | { type: "done"; id: number }
    | { type: "progress"; id: number }
    | { type: "delete"; id: number }
    | { type: "search"; keyword: string }
    | { type: "stats" }
    | { type: "help" }
    | { type: "edit"; id: number; judul: string }
    | { type: "deadline"; id: number; date: string }
    | { type: "priority", id: number; priority: Priority }
    | { type: "export"; fileName: string }
    | { type: "unknown"; input: string };