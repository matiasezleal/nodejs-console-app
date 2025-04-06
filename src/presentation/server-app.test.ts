import {ServerApp} from "./server-app";
import {CreateTable} from "../Domain/use-cases/create-table.use-case";
import {SaveFile} from "../Domain/use-cases/save-file.use-case";


describe('Server app Tests',()=>{

    test('Create serverApp',()=>{
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });
    test('Integration Test - Should run server app',()=>{

        const logSpy = jest.spyOn(console,'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype,'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype,'execute');

        const options = {
            base:2,
            limit:10,
            showTable:true,
            fileName:'myfile',
            fileDestination:'test-destination',
        }

        ServerApp.run(options);
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenCalledWith('File created!');
        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base:2,limit:10,showTable:true,fileName:'myfile'
        });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination:options.fileDestination,
            fileName:options.fileName,
        })

    })
})