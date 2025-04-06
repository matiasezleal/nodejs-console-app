import {ServerApp} from "./server-app";
import {CreateTable} from "../Domain/use-cases/create-table.use-case";
import {SaveFile} from "../Domain/use-cases/save-file.use-case";


describe('Server app Tests',()=>{
    const options = {
        base:2,
        limit:10,
        showTable:true,
        fileName:'myfile',
        fileDestination:'test-destination',
    }
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    test('Create serverApp',()=>{
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });
    test('Integration Test - Should run server app',()=>{

        const logSpy = jest.spyOn(console,'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype,'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype,'execute');



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
        });

    });

    test('Unit test with mocked values',()=>{

        const createMock = jest.fn().mockReturnValue('1x1=1');
        const saveFileMock = jest.fn().mockReturnValue(true);
        const logMock = jest.fn();
        const logErrorMock = jest.fn();

        console.error= logErrorMock;
        console.log = logMock;
        CreateTable.prototype.execute=createMock
        SaveFile.prototype.execute=saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({"base":options.base,"limit":options.limit,"showTable":options.showTable});
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1x1=1',
            fileDestination: options.fileDestination,
            fileName:options.fileName,
        });

        expect(logMock).toHaveBeenCalledWith('File created!');
    });
})