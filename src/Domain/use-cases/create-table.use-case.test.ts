import {CreateTable} from "./create-table.use-case";



describe('CreateTable UseCase', () => {

    test('Should create table with default values',()=>{


        const createTable = new CreateTable();
        const table = createTable.execute({base:3});

        const rows = table.split('\n').length;
        console.log(table);
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('3 x 1 = 3');
        expect(table).toContain('3 x 2 = 6');
        expect(rows).toBe(5);

    });

    test('Should create table with custom values',()=>{
        const options = {
            base:2,
            limit:20,
        }

        const table = new CreateTable().execute(options);
        expect(table.split('\n').length).toBe(20);
        expect(table).toContain('2 x 20');
    })
})