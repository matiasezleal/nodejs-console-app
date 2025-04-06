import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

export const yarg = yargs(process.argv)
    .option('b',{
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'The base argument',
    })
    .option('l',{
        alias: 'limit',
        type: 'number',
        default:5,
        describe: 'Define limit',
    })
    .option('s',{
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Show the table',
    })
    .option('n',{
        alias: 'name',
        type: 'string',
        default: 'table',
        describe: 'Name of the file',

    })
    .option('d',{
        alias: 'destination',
        type: 'string',
        default: 'outputs',
        describe: 'The destination of the file',
    })
    .check((argv, options)=>{

        if (argv.b <1) throw 'Base should be greater than 1';
        return true;
    })
.parseSync()