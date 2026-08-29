import {Command} from "@apptypes";
import {TaskService} from "@services";
import {tampilkanDaftarTask, tampilkanError, tampilkanHelp, tampilkanStats, tampilkanSukses} from "./display";
import {isIdValid, isJudulValid} from "@utils";

export function jalankanCommand(command: Command, service: TaskService): void {
    switch (command.type) {
        case "add": {
            if (!isJudulValid(command.judul)) {
                return tampilkanError("Judul task minimal 3 karakter");
            }
            const task = service.tambahTask(command.judul);
            return tampilkanSukses(`Task #${task.id} berhasil ditambahkan`);
        }

        case "list": {
            const tasks = command.filterStatus
                ? service.getTaskByStatus(command.filterStatus)
                : service.getSemuaTask();
            return tampilkanDaftarTask(tasks);
        }

        case "done": {
            const task = service.ubahStatus(command.id, "done");
            if (!task) return tampilkanError(`Task #${command.id} tidak ditemukan`);
            return tampilkanSukses(`Task #${command.id} ditandai selesai`);
        }

        case "progress": {
            const task = service.ubahStatus(command.id, "in_progress");
            if (task === undefined) return tampilkanError(`Task #${command.id} tidak ditemukan. id tidak ditemukan atau task hilang`);
            return tampilkanSukses(`Task #${command.id} ditandai in progress, semoga cepat selesai`);
        }

        case "search": {
            const task = service.cariTask(command.keyword);
            return tampilkanDaftarTask(task);
        }

        case "delete": {
            const task = service.hapusTask(command.id);
            if (!task) {
                return tampilkanError(`Task dengan id ${command.id} gagal di hapus. id tidak ditemukan atau task hilang`)
            }
            return tampilkanSukses(`Task dengan id ${command.id} berhasil di hapus`)
        }

        case "edit": {
            if (!isIdValid(command.id)) {
                return tampilkanError("id tidak valid, harus berupa nomor");
            }

            if (!isJudulValid(command.judul)) {
                return tampilkanError("Judul Tidak boleh kosong dan harus lebih dari 3 kata");
            }

            const task = service.ubahJudul(command.id, command.judul);
            if (task === undefined) return tampilkanError(`Task #${command.id} tidak ditemukan. id tidak ditemukan atau task hilang`);
            return tampilkanSukses(`berhasil merubah judul pada id ${command.id}, menjadi ${command.judul}`);
        }

        case "export": {
            const task = service.exportToTxT(command.fileName);
            if (!task) return tampilkanError("Nama file tidak valid. file harus lebih dari 3 kata dan kurang dari 15 kata");
            return tampilkanSukses(`berhasil mengexport data ke file .txt dengan nama ${command.fileName}`);
        }

        case "stats": {
            return tampilkanStats(service.getStats());
        }

        case "help": {
            return tampilkanHelp();
        }

        case "unknown":
            return tampilkanError(`Perintah tidak dikenal: "${command.input}". Ketik 'help' untuk bantuan.`);
    }
}