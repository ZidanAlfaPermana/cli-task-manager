interface AppConfig {
    AppName: string;
    version: string;
    maxPeserta: number;
    jsonLocation: string;
}

export const APP_CONFIG: AppConfig = {
    AppName: "ts-project-template",
    version: "1.0.0",
    maxPeserta: 1000,
    jsonLocation: "./data/tasks.json",
}
