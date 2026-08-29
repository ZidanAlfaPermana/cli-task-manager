interface AppConfig {
    AppName: string;
    version: string;
    author: string;
    linkGithub: string;
    maxPeserta: number;
    jsonLocation: string;
    jsonFileName: string;
}

export const APP_CONFIG: AppConfig = {
    AppName: "ts-project-template",
    version: "1.0.0",
    maxPeserta: 1000,
    jsonLocation: "./../../data",
    jsonFileName: "tasks.json",
    author: "Zidan Alfa Permana",
    linkGithub: "https://github.com/ZidanAlfaPermana",
}
