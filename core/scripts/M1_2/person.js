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
  if(filteredData.length>0){
    console.log(`\n${filteredData.length} dados Filtrados: \n`)
    prompt('Listar: (pressione enter)')
    filteredData.forEach(people => console.log(people.toJSON()))
  }else{
    console.log(`\nNenhum dado foi encontrado com o nome '${name}'. `)
  }
}
module.exports = { listAllPeopleInJSON, handleFilteredNameInput }
