// Discriminated union — dari Minggu 2!
import {Priority, TaskStatus} from "./task.types";

export type Command =
    | { type: "add";      judul: string; prioritas?: Priority }
    | { type: "list";     filter?: { status?: TaskStatus; prioritas?: Priority } }
    | { type: "done";     id: number }
    | { type: "progress"; id: number }
    | { type: "delete";   id: number }
    | { type: "search";   keyword: string }
    | { type: "stats" }
    | { type: "help" }
    | { type: "unknown";  input: string };