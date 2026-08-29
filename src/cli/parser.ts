import type {Command, Priority} from "@apptypes";
import {isStatusValid} from "@utils";

export function parseArgs(args: string[]): Command {
    const [perintah, ...sisanya] = args;

    switch (perintah) {
        case "add": {
            let inputDeadline: string | undefined = undefined;
            let inputPriority: string | undefined = undefined;
            const deadlineIdx = sisanya.indexOf("--deadline");
            if (deadlineIdx !== -1) {
                inputDeadline = sisanya[deadlineIdx + 1];
            }
            const priorityIdx = sisanya.indexOf("--priority");
            if (priorityIdx !== -1) {
                inputPriority = sisanya[priorityIdx + 1];
            }
            const flagIndices = [deadlineIdx, priorityIdx].filter(idx => idx !== -1);
            const batasJudul = flagIndices.length > 0 ? Math.min(...flagIndices) : sisanya.length;

            const judul = sisanya.slice(0, batasJudul).join(" ").replace(/^["']|["']$/g, "");
            return {
                type: "add",
                judul: judul,
                deadline: inputDeadline,
                prioritas: inputPriority as Priority | undefined
            };
        }

        case "list": {
            const result: any = { type: "list" };
            const statusIdx = sisanya.indexOf("--status");
            if (statusIdx !== -1 && sisanya[statusIdx + 1]) {
                const status = sisanya[statusIdx + 1];
                if (isStatusValid(status)) {
                    result.filterStatus = status;
                }
            }
            const priorityIdx = sisanya.indexOf("--priority");
            if (priorityIdx !== -1 && sisanya[priorityIdx + 1]) {
                result.filterPriority = sisanya[priorityIdx + 1];
            }
            const sortIdx = sisanya.indexOf("--sort");
            if (sortIdx !== -1 && sisanya[sortIdx + 1]) {
                result.sortBy = sisanya[sortIdx + 1];
            }
            return result;
        }

        case "done":
            return { type: "done", id: Number(sisanya[0]) };

        case "progress":
            return { type: "progress", id: Number(sisanya[0]) };

        case "delete":
            return { type: "delete", id: Number(sisanya[0]) };

        case "search":
            return { type: "search", keyword: sisanya.join(" ") };

        case "stats":
            return { type: "stats" };

        case "export":
            const fileName = sisanya.join(" ")
            return { type: "export", fileName:  fileName};

        case "deadline":
            const date = sisanya.slice(1).join(" ").replace(/^["']|["']$/g, "");
            return { type: "deadline", id: Number(sisanya[0]), date: date}

        case "priority":
            const priorityValue = sisanya.slice(1).join(" ").replace(/^["']|["']$/g, "");
            return { type: "priority", id: Number(sisanya[0]), priority: priorityValue as Priority };

        case "edit":
            const id = Number(sisanya[0]);
            const judul = sisanya.slice(1).join(" ").replace(/^["']|["']$/g, "");
            return { type: "edit", id: id, judul: judul };

        case "help":
        case "--help":
        case "-h":
            return { type: "help" };

        default:
            return { type: "unknown", input: perintah || "" };
    }
}