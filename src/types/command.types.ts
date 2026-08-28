import type { TaskStatus, Priority } from "./task.types";

// Discriminated union dari Minggu 2
export type Command =
    | { type: "add";      judul: string; prioritas?: Priority }
    | { type: "list";     filterStatus?: TaskStatus }
    | { type: "done";     id: number }
    | { type: "progress"; id: number }
    | { type: "delete";   id: number }
    | { type: "search";   keyword: string }
    | { type: "stats" }
    | { type: "help" }
    | { type: "unknown";  input: string };