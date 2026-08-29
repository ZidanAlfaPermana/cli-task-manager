// Fungsi yang harus ada:
// - tampilkanDaftarTask(tasks: Task[]): void
// - tampilkanStats(stats: TaskStats): void
// - tampilkanHelp(): void
// - tampilkanError(pesan: string): void
// - tampilkanSukses(pesan: string): void

// Target output tampilkanDaftarTask:
//
// ID  STATUS        PRIORITAS  JUDUL
// ─────────────────────────────────────────────────────────
// 1   [ ] todo      high       Setup project TypeScript
// 2   [~] progress  medium     Buat CLI parser
// 3   [x] done      low        Baca dokumentasi
//
// Total: 3 task


// Tips: gunakan padEnd() untuk merapikan kolom
//const baris = `${String(t.id).padEnd(4)}${statusLabel.padEnd(14)}${t.prioritas.padEnd(11)}${t.judul}`;

import {Task, TaskStats} from "@apptypes";
import {APP_CONFIG} from "@appconfig";

function tampilanNamaApp() {
    console.log(`${APP_CONFIG.AppName} - ${APP_CONFIG.version}\n─────────────────────────────────────────────────────────`);
}

function tampilanCredit() {
    console.log(`\n─────────────────────────────────────────────────────────\nCode By: ${APP_CONFIG.author} | ${APP_CONFIG.linkGithub}
    `);
}

export function tampilkanDaftarTask(tasks: Task[]): void {
    if (tasks.length === 0) {
        tampilanNamaApp();
        console.log("Belum ada task. Gunakan perintah add untuk menambahkan.");
        tampilanCredit();
        return;
    }
    tampilanNamaApp();
    console.log("ID  STATUS        PRIORITAS  JUDUL");
    console.log("─────────────────────────────────────────────────────────");

    tasks.forEach((t) => {
        let statusLabel = "";
        switch (t.status) {
            case "todo":
                statusLabel = "[ ] todo";
                break;
            case "in_progress":
                statusLabel = "[~] progress";
                break;
            case "done":
                statusLabel = "[x] done";
                break;
            default:
                statusLabel = `[?] ${t.status}`;
        }

        const baris = `${String(t.id).padEnd(4)}${statusLabel.padEnd(14)}${t.prioritas.padEnd(11)}${t.judul}`;
        console.log(baris);
    });

    console.log("");
    console.log(`Total: ${tasks.length} task`);
    tampilanCredit();
}

// 2. Tampilkan Statistik
export function tampilkanStats(stats: TaskStats): void {
    tampilanNamaApp();
    console.log(" STATISTIK TASK");
    console.log("─────────────────");
    console.log(`Total Task : ${stats.total}`);
    console.log(`Todo       : ${stats.todo}`);
    console.log(`Progress   : ${stats.inProgress}`);
    console.log(`Done       : ${stats.done}`);
    tampilanCredit();
}

// 3. Tampilkan Help
export function tampilkanHelp(): void {
    tampilanNamaApp();
    console.log("  PANDUAN PENGGUNAAN CLI TASK MANAGER");
    console.log("───────────────────────────────────────");
    console.log("Perintah yang tersedia:");
    console.log("  add <judul>              : Menambahkan task baru");
    console.log("  list [--status <status>] : Menampilkan daftar task (bisa di-filter status)");
    console.log("  edit <id> <judul>        : Mengubah judul task berdasarkan ID");
    console.log("  done <id>                : Mengubah status task menjadi selesai (done)");
    console.log("  progress <id>            : Mengubah status task menjadi dalam pengerjaan (progress)");
    console.log("  delete <id>              : Menghapus task berdasarkan ID");
    console.log("  search <keyword>         : Mencari task berdasarkan kata kunci");
    console.log("  export <nama_file>       : Mengekspor data task ke dalam file");
    console.log("  stats                    : Menampilkan statistik task");
    console.log("  help, --help, -h         : Menampilkan menu bantuan ini");
    tampilanCredit();
}

// 4. Tampilkan Error (Menggunakan warna teks merah pada terminal)
export function tampilkanError(pesan: string): void {
    console.error(`\x1b[31mX Error:\x1b[0m ${pesan}`);
}

// 5. Tampilkan Sukses (Menggunakan warna teks hijau pada terminal)
export function tampilkanSukses(pesan: string): void {
    console.log(`\x1b[32mSukses:\x1b[0m ${pesan}`);
}