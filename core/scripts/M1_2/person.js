const fs = require('fs');
const csv = require('csv-parser');
const Person = require('./models/Person'); 

async function insertDataFromCSV(filename) {
  fs.createReadStream(filename)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        await Person.create({
          userId: row['User Id'],
          firstName: row['First Name'],
          lastName: row['Last Name'],
          sex: row['Sex'],
          email: row['Email'],
          phone: row['Phone'],
          dateOfBirth: row['Date of birth'],
          jobTitle: row['Job Title']
        });
        console.log('Registro inserido:', row);
      } catch (error) {
        console.error('Erro ao inserir registro:', error);
      }
    })
    .on('end', () => {
      console.log('Inserção de dados concluída');
    });
}

insertDataFromCSV('../database/table/people-10000.csv');
