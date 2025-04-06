import {CreateTable} from "../Domain/use-cases/create-table.use-case";
import {SaveFile} from "../Domain/use-cases/save-file.use-case";


interface RunOptions {
    base:number;
    limit:number;
    showTable:boolean;
    fileName:string;
    fileDestination:string;
}


export class ServerApp{

    static run(options: RunOptions){
        console.log("Running Server App...");
        console.log(options);

        const table = new CreateTable().execute(options);

        const wasCreated = new SaveFile()
            .execute({
                fileContent:table,
                fileDestination:options.fileDestination,
                fileName:options.fileName,

            })
        if( options.showTable ){
            console.log(table);
        }

        wasCreated ? console.log('File created!') : console.log('File not created!');
    }
}