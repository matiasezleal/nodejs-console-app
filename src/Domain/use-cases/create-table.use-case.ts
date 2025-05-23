
export interface CreateTableUseCase {
    execute: (options: CreateTableOptions)=> string;

}

export interface CreateTableOptions{
    base:number;
    limit?:number;
}


export class CreateTable implements CreateTableUseCase{

    constructor() {
        /**
         *  DI - Dependecy Injection
         */
    }

    execute({base,limit=5}:CreateTableOptions){
        let outputMessage: string = '';
        for(let i =1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${base * i }`;
            if(i < limit) outputMessage += '\n';

        }
        return outputMessage;
    }
}