import {ServerApp} from "./presentation/server-app";


describe('Test App', ()=>{

    test('Should run', async ()=>{

        const serverRunMock = jest.fn()
        ServerApp.run = serverRunMock;
        process.argv = ['node','app.ts','-b','5','-l','10','-s','n','fileapptest','d','apptest'];


        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base:5,
            limit:10,
            showTable:true,
            fileName:'testappfile',
            fileDestination:'apptest'
        });
    })
})