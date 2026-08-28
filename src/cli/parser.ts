import type { Command } from "./../types";
import {isStatusValid} from "./../utils";

export function parseArgs(args: string[]): Command {
    const [perintah, ...sisanya] = args;

    switch (perintah) {
        case "add": {
            const judul = sisanya.join(" ").replace(/^["']|["']$/g, "");
            return { type: "add", judul };
        }

        case "list": {
            const statusIdx = sisanya.indexOf("--status");
            if (statusIdx !== -1 && sisanya[statusIdx + 1]) {
                const status = sisanya[statusIdx + 1];
                if (isStatusValid(status)) {
                    return { type: "list", filterStatus: status };
                }
            }
            return { type: "list" };
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

        case "help":
        case "--help":
        case "-h":
            return { type: "help" };

        default:
            return { type: "unknown", input: perintah || "" };
    }
}