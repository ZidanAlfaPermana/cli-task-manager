import {parseArgs} from "./cli";


const args = process.argv.slice(2);
const command = parseArgs(args);
console.log("Command terparsing:", command); // sementara, untuk test