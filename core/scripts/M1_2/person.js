const Person = require("../../database/models/personModel");
const prompt = require('prompt-sync')({ sigint: true });
const { Op } = require('sequelize');

async function getAllPeopleFromDB(){
  try{
    return await Person.findAll({limit: 20})
  }catch(err){
    console.log(err);
  }
}

async function listAllPeopleInJSON(){ 
  try{
    const people = await getAllPeopleFromDB()
    console.log('People: ')
    people.forEach(people => console.log(people.toJSON()))
  }catch(err){
    console.log('Erro ao listar pessoas:', err);
  }
}

async function filterDataByName(name){
  try {
    const filterData = await Person.findAll({
      where: { [Op.or]: [
        {first_name: { [Op.like]: `%${name}%`}},
        {last_name: { [Op.like]: `%${name}%`} }
      ]}
    });
    return filterData;
  } catch (error) {
    console.error('Erro ao filtrar usuários:', error);
  }
}

async function handleFilteredNameInput(){
  const name = prompt('Insira o nome a ser filtrado: ')
  const filteredData = await filterDataByName(name)
  if(filteredData){
    console.log(`\n${filteredData.length} dados Filtrados: \n`)
    prompt('Listar: (pressione enter)')
    filteredData.forEach(people => console.log(people.toJSON()))
  }else{
    console.log(`Nenhum dado foi encontrado com o nome '${name}'. `)
  }
}
module.exports = { listAllPeopleInJSON, handleFilteredNameInput }

/*
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
*/