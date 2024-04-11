const fs = require('fs');
const Person = require('../../database/models/personModel');

async function getFromCSV(filename) {
    let objectData = []
    const fileData = await fs.readFileSync(filename, 'utf-8')
    const lines = fileData.split("\r\n")
    const content = lines.slice(1, lines.length)
    await Person.truncate();
    for (const line of content) {
        const column = parseCSVLine(line);
        if(column.length === 9){
            let data = {
                user_id: column[1],
                first_name: column[2],
                last_name: column[3],
                sex: column[4],
                email: column[5],
                phone: column[6],
                date_of_birth: column[7],
                job_title: column[8]
            }
            objectData.push(data);
        }
    }
    return objectData;
}

function parseCSVLine(line) {
    const lineSplitted = line.split('""');

    let result = lineSplitted[0].replaceAll('"', '').split(',').filter(elem => elem.length > 0).flat();

    if (lineSplitted.length > 1) {
        result.push(lineSplitted[1]);
    }

    return result;
}

async function tableInsertion(content) {
    try {
        await Person.bulkCreate(content, );
        console.log(`Foram inseridos ${content.length} dados`);
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        throw error
    }
}

(async () => {
    const content = await getFromCSV("./core/utils/people-100000.csv");
    await tableInsertion(content);
})();