import {SaveFile} from "./save-file.use-case";
import fs from "fs";


describe('SaveFile', () => {

    const testOptions= {
        fileContent: 'my custom content',
        fileDestination: 'cs-02',
        fileName: 'cs2-test',
    }
    afterEach(()=>{

        /* we delete de defaul folder*/
        fs.existsSync('outputs') ? fs.rmSync('outputs',{recursive:true}):null;
        /* we delete de folder of test cs-02*/
        fs.existsSync('cs-02') ? fs.rmSync('cs-02',{recursive:true}):null;
    })

    test('CS-01 Should save file with default values', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content'
        }
        const defaultFilePath = 'outputs/table.txt';

        const result = saveFile.execute(options);

        expect(result).toBeTruthy();
        const verifyFile = fs.existsSync(defaultFilePath);
        expect(verifyFile).toBeTruthy();
        const fileContent = fs.readFileSync(defaultFilePath,{encoding:'utf8'});


        expect(fileContent).toContain(options.fileContent);
    });

    test('CS-02 Should save file',()=>{
        const options = {
            fileContent: 'my custom content',
            fileDestination: 'cs-02',
            fileName: 'cs2-test',
        }

        const result = new SaveFile().execute(options);
        expect(result).toBeTruthy();
        const wasCreated = fs.existsSync(`${options.fileDestination}/${options.fileName}.txt`);
        expect(wasCreated).toBeTruthy();
        const fileContentResult = fs.readFileSync(`${options.fileDestination}/${options.fileName}.txt`,{encoding:'utf8'});
        expect(fileContentResult).toContain(options.fileContent);

    });

    test('CS-03 Should return false if dir creation failed', () => {
        const saveFile = new SaveFile();

        /* Mock */
        const mkdirSpy = jest.spyOn(fs,'mkdirSync')
            .mockImplementationOnce(
                ()=>{throw  new Error('Could not create directory');}
            );
        /* Act */

        const result = saveFile.execute(testOptions);
        expect(result).toBeFalsy();

        mkdirSpy.mockRestore();
    });

    test('CS-04 Should return false if file creation failed', () => {
        const saveFile = new SaveFile();

        /* Mock */
        const writeFileSpy = jest.spyOn(fs,'writeFileSync')
            .mockImplementationOnce(
                ()=>{throw  new Error('Could not create directory');}
            );
        /* Act */

        const result = saveFile.execute(testOptions);
        expect(result).toBeFalsy();

        writeFileSpy.mockRestore();
    });
});