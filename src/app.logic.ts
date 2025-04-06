
/** DEPREDATED -- this was refactorized **/

import fs from 'fs';
import {yarg} from "./config/plugins/args.plugin";


let outputMessage = '';
const base = yarg.b;
const limit = yarg.l;
const headerMEssage = `
------------------------------------
        Tabla del ${base}
------------------------------------
`;

for(let i =1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i }\n`;

}

if(yarg.s){
    outputMessage = headerMEssage+ '\n' + outputMessage ;
    console.log(outputMessage);
}


const outputPath = 'output/';

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/table-${base}.txt`, outputMessage);

console.log("File created!");