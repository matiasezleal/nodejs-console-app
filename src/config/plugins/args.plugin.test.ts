//import {yarg} from "./args.plugin";

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv,...args];
    const {yarg} = await import('./args.plugin');

    return yarg;
}


describe('Test args.plugin', () => {

    const originalArgv = process.argv;
    beforeEach(()=>{
         process.argv = originalArgv;
         jest.resetModules();
    });

    test('Yarg-01 Default values',async ()=> {
        const argv = runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 5,
            s: false,
            n: 'table',
            d: 'outputs'
        }));

    });
    test('Yarg-02 Should return configuration with custom values',async ()=>{
        const argv = runCommand(['-b','3','-l','15','-d','yargtest']);


        expect(argv).toEqual(expect.objectContaining({
            b: 3,
            l: 15,
            s: false,
            n: 'table',
            d: 'yargtest'
        }))
    });

});