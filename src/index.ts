import { parseArgs, jalankanCommand } from "@cli";
import { TaskService } from "@services";
import { StorageService } from "@services";

// Muat data saat start
const dataTersimpan = StorageService.muat();
const service = new TaskService(dataTersimpan);

// Jalankan command
const command = parseArgs(process.argv.slice(2));
jalankanCommand(command, service);

// Simpan data setelah command selesai
StorageService.simpan(service.getSemuaTask());